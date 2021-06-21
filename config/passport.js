const User = require("../models/User");
const LoginStrategy = require("passport-local").Strategy;
const RegisterStrategy = require("passport-local").Strategy;
const UpdateStrategy = require("passport-local").Strategy;
const registerSchemaValidation = require("../validators/register.schema");
const updateSchemaValidation = require("../validators/update.register");
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  passport.use(
    "passportLogin",
    new LoginStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
        if (email === "" || password === "")
          return done(null, { error: "empty" });

        await User.validation(email, function (err, data) {
          if (err) return done(err, null);
          else if (data) {
            if (bcrypt.compareSync(password, data.password))
              return done(null, data);
            else return done(null, { error: "password" });
          } else return done(null, { error: "email" });
        });
      }
    )
  );

  passport.use(
    "passportRegister",
    new RegisterStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        let { phone } = req.body;
        if (phone.length == 11) {
          phone = phone.replace(phone.charAt(0), "+234");
          req.body.phone = phone;
        }
        req.body.password = bcrypt.hashSync(password, 10);
        const { error } = registerSchemaValidation.validate(req.body);

        if (error) return done(null, { validationError: error });
        else {
          User.register(
            { ...req.body, profile_pics: "noimage.jpg" },
            function (err, user) {
              if (err) return done(err, null);
              else return done(null, user);
            }
          );
        }
      }
    )
  );

  passport.use(
    "passportUpdate",
    new UpdateStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        const { error } = updateSchemaValidation.validate(req.body);

        if (error) return done(null, { validationError: error });
        else {
          User.validation(email, function (err, data) {
            if (err) return done(err, null);
            else if (data) {
              const data = [bcrypt.hashSync(password, 10), email];
              User.update(data, function (err) {
                if (err) return done(err, null);
                return done(null, data);
              });
            } else {
              return done(null, { error: true });
            }
          });
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(err, user);
  });
};
