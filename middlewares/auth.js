module.exports = {
  ensureAuth: function (req, res, next) {
    console.log(req.session.user);
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(403).json({ msg: "forbidden page... login first " });
    }
    //res.status(403).json({ msg: "forbidden page... login first " });
  },
  ensureGuest: function (req, res, next) {
    console.log(req.session.user);
    if (!req.isAuthenticated() && req.session.user) {
      return next();
    } else {
      // res.redirect("/dashboard");
      res.status(200).json({ msg: "continue" });
    }
    //res.status(200).json({ msg: "continue" });
  },
};
