const Patient = require("../models/patient");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    return res.status(200).json({ ok: true, data: patients });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const patient = await Patient.create({
      first_name: firstName,
      last_name: lastName,
      email: email || null,
    });

    return res.status(200).json({ ok: true, data: patient });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

module.exports = router;
