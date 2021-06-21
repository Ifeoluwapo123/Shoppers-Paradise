const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  name: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^[a-zA-Z]+ [a-zA-Z]+$/)
    .required(),
  email: Joi.string()
    .email()
    .lowercase()
    .pattern(/^\S+@\S+$/)
    .required(),
  password: Joi.string().min(5).required(),
  phone: Joi.string()
    .regex(/^[\+]?[234]\d{12}$/)
    .min(11)
    .required(),
});
