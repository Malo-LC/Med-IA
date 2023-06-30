const axios = require("axios");
const { saveAnalysisToDb } = require("../utils/analysis");
const Analysis = require("../models/analysis");
const User = require("../models/user");
const Patient = require("../models/patient");
const router = require("express").Router();

router.get("/history", async (req, res) => {
  try {
    const userId = req?.session?.passport?.user;
    if (!userId) return res.status(400).json({ error: "User not found, please reconnect", ok: false });
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(400).json({ error: "User not found, please reconnect", ok: false });
    const history = await Analysis.findAll({ where: { userId: user.id }, include: [Patient] });
    history.reverse();
    return res.status(200).json({ ok: true, message: "History retrieved", data: history });
  } catch (error) {
    console.log(error?.code || error);
  }
});

router.post("/pneumonia", async (req, res) => {
  try {
    const image = req.body.image;
    const patientId = req.body.patientId;
    if (!image) return res.status(400).json({ error: "No image provided", ok: false });
    if (!patientId) return res.status(400).json({ error: "No patient selected", ok: false });

    // check if image is more than 10mb
    if (image.length > 10000000) return res.status(400).json({ error: "Image too large", ok: false });

    // check if image is valid (base64 and picture)
    const base64Regex = /^data:image\/\w+;base64,/;
    if (!base64Regex.test(image)) return res.status(400).json({ error: "Invalid image", ok: false });

    // send image to python server
    const result = await axios.post("http://localhost:5000/predict", { image }, { headers: { "Content-Type": "application/json" } });
    const data = result.data === "normal" ? "Normal" : "Pneumonia";

    const userId = req?.session?.passport?.user;
    const saved = await saveAnalysisToDb("pneumonia", data, image, userId, patientId);
    if (saved?.error) return res.status(500).json({ error: saved.error, ok: false });

    return res.status(200).json({ ok: true, message: "Pneumonia analyzed", data: data });
  } catch (error) {
    console.log(error?.code || error);
  }
});

module.exports = router;