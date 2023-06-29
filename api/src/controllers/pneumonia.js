const router = require("express").Router();
const axios = require("axios");
const { saveAnalysisToDb } = require("../utils/analysis");
router.post("/analyze", async (req, res) => {
  try {
    const image = req.body.image;
    if (!image) return res.status(400).json({ error: "No image provided", ok: false });

    // check if image is more than 10mb
    if (image.length > 10000000) return res.status(400).json({ error: "Image too large", ok: false });

    // check if image is valid (base64 and picture)
    const base64Regex = /^data:image\/\w+;base64,/;
    if (!base64Regex.test(image)) return res.status(400).json({ error: "Invalid image", ok: false });

    // send image to python server
    const result = await axios.post("http://localhost:5000/predict", { image }, { headers: { "Content-Type": "application/json" } });
    const data = result.data === "normal" ? "Normal" : "Pneumonia";

    const userId = req?.session?.passport?.user;
    const saved = saveAnalysisToDb("pneumonia", data, image, userId);
    if (saved.error) return res.status(500).json({ error: saved.error, ok: false });

    return res.status(200).json({ ok: true, message: "Pneumonia analyzed", data: data });
  } catch (error) {
    console.log(error?.code || error);
  }
});

module.exports = router;
