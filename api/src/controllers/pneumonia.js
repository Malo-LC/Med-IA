const router = require("express").Router();

router.post("/analyze", (req, res) => {
  try {
    const picture = req.body.picture;
    console.log(req.body);
    if (!picture) return res.status(400).json({ error: "No picture provided", ok: false });
    console.log(picture);

    res.status(200).json({ ok: true, message: "Pneumonia analyzed" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
