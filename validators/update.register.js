const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  email: Joi.string()
    .email()
    .lowercase()
    .pattern(/^\S+@\S+$/)
    .required(),
  password: Joi.string().min(5).required(),
  confirmpassword: Joi.ref("password"),
});
