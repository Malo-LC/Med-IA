const router = require("express").Router();
const axios = require("axios");

router.post("/analyze", async (req, res) => {
  try {
    const image = req.body.image;
    if (!image) return res.status(400).json({ error: "No image provided", ok: false });

    // check if image is valid (base64 and picture)
    const base64Regex = /^data:image\/\w+;base64,/;
    if (!base64Regex.test(image)) return res.status(400).json({ error: "Invalid image", ok: false });

    const result = await axios.post("http://localhost:5000/predict", { image }, { headers: { "Content-Type": "application/json" } });
    const data = result.data === "normal" ? "Normal" : "Pneumonia";
    return res.status(200).json({ ok: true, message: "Pneumonia analyzed", data: data });
  } catch (error) {
    console.log(error?.code || error);
  }
});

module.exports = router;
