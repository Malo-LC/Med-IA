const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const app = require("express").Router();

app.post("/login", async (req, res) => {
  try {
    passport.authenticate("local", (err, user) => {
      if (err) return res.status(404).json({ error: "Email or password invalid", isValid: false });
      if (!user) return res.status(404).json({ error: "Email or password invalid", isValid: false });
      req.logIn(user, (err) => {
        if (err) return res.status(404).json({ error: "Email or password invalid", isValid: false });
        const user = {
          firstName: req.user.first_name,
          lastName: req.user.last_name,
          email: req.user.email,
        };
        return res.status(200).json({ message: "Login successful", user: user, isValid: true });
      });
    })(req, res);
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
