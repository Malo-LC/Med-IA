const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// load up the user model
const User = require("./models/user");

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const foundUser = await User.findOne({ where: { email: email } });
          if (!foundUser) return done("Email or password invalid");

          const verifiedPassword = await bcrypt.compare(password, foundUser.password);
          if (!verifiedPassword) return done("Email or password invalid");

          if (foundUser) return done(null, foundUser);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize user object from the session
  passport.deserializeUser(async function (id, done) {
    const user = await User.findOne({ where: { id: id } });
    done(null, user);
  });
};
