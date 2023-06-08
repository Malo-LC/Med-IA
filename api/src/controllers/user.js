const User = require("../models/user");
const bcrypt = require("bcrypt");
const app = require("express").Router();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ where: { email: email } });
    if (!foundUser) return res.status(404).json({ error: "Email or password invalid", isValid: false });

    const verifiedPassword = await bcrypt.compare(password, foundUser.password);
    if (!verifiedPassword) return res.status(404).json({ error: "Email or password invalid", isValid: false });

    const user = {
      firstName: foundUser.first_name,
      lastName: foundUser.last_name,
      email: foundUser.email,
    };

    return res.status(200).json({ isValid: true, user: user });
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const foundUser = await User.findOne({ where: { email: email } });
    if (foundUser) return res.status(409).json({ error: "User already exists", isValid: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
    });

    const user = {
      firstName: userCreated.first_name,
      lastName: userCreated.last_name,
      email: userCreated.email,
    };

    return res.status(200).json({ message: "Signup successful", user: user, isValid: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
