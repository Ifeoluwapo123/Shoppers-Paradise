const express = require("express");
const passport = require("passport");
const router = express.Router();
const handleResponse = require("../utils/response");
const authMiddleware = require("../middlewares/auth");

router.post(
  "/login",
  passport.authenticate("passportLogin", {
    failureRedirect: "/api/auth/login",
  }),
  async function (req, res) {
    const { error } = req.user;
    req.session.user = req.user;

    console.log(req.session.user);
    console.log(req.isAuthenticated());
    if (error === "empty")
      return handleResponse(
        req,
        res,
        403,
        null,
        "input field(s) cannot be empty"
      );
    else if (error === "password")
      return handleResponse(req, res, 403, null, "invalid password");
    else if (error === "email")
      return handleResponse(req, res, 403, null, "invalid email address");
    else return handleResponse(req, res, 204);
  }
);

router.get("/welcome", (req, res) => {
  res.send("welcome " + req.session.user);
});

router.post(
  "/register",
  passport.authenticate("passportRegister", {
    failureRedirect: "/api/auth/login",
  }),
  async (req, res) => {
    const { validationError } = req.user;
    if (validationError)
      return handleResponse(
        req,
        res,
        403,
        null,
        validationError.details[0].message
      );
    else return handleResponse(req, res, 200);
  }
);

router.post(
  "/update",
  passport.authenticate("passportUpdate", {
    failureRedirect: "/api/auth/login",
  }),
  async (req, res) => {
    const { validationError, error } = req.user;
    if (validationError)
      return handleResponse(
        req,
        res,
        403,
        null,
        validationError.details[0].message
      );
    else if (error)
      return handleResponse(req, res, 403, null, "invalid email address");
    else return handleResponse(req, res, 200);
  }
);

router.get("/login", (req, res) => {
  return handleResponse(req, res, 500, null, "login failed");
});

router.get("/logout", (req, res) => {
  console.log(req.session.user);
  req.logout();
  req.session = null;
  return handleResponse(req, res, 201);
});

module.exports = router;
