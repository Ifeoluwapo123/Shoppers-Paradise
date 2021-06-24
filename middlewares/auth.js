module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.session.user) {
      return next()
    } else {
      res.status(403).json({ msg: 'forbidden page... login first ' })
    }
  },
}
