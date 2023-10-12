const Joi = require('joi');

const userValidate = (data, isRegister = true) => {
  const userSchema = Joi.object({
    USER_EMAIL: Joi.string().pattern(new RegExp('gmail.com')).email().lowercase().required(),
    USER_PASSWORD: Joi.string().min(6).max(32).required(),
    USER_PHONE: isRegister ? Joi.string().min(9).max(15).required() : Joi.string().min(9).max(15),
    USER_NAME: isRegister ? Joi.string().required() : Joi.string(),
    USER_IS_RESTAURANT: Joi.number()
  });

  return userSchema.validate(data);
};

const validatePassword = (data) => {
  const userSchema = Joi.object({
    NEW_USER_PASSWORD: Joi.string().min(6).max(32).required()
  })

  return userSchema.validate(data)

}



module.exports = { userValidate, validatePassword };
