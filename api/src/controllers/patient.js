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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ ok: false, error: "Invalid id" });

    const patient = await Patient.findOne({ where: { id } });
    return res.status(200).json({ ok: true, data: patient });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ ok: false, error: "Invalid id" });

    const patient = await Patient.findOne({ where: { id } });
    if (!patient) return res.status(400).json({ ok: false, error: "Patient not found" });

    const { firstName, lastName, email, age, gender } = req.body;
    patient.first_name = firstName || patient.first_name;
    patient.last_name = lastName || patient.last_name;
    patient.email = email || patient.email;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    await patient.save();

    return res.status(200).json({ ok: true, data: patient });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, age, gender } = req.body;
    const patient = await Patient.create({
      first_name: firstName,
      last_name: lastName,
      email: email || null,
      age: age,
      gender: gender,
    });

    return res.status(200).json({ ok: true, data: patient });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

module.exports = router;
