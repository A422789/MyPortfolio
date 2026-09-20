const Joi = require('joi');

const authSchemas = {
  login: Joi.object({
    username: Joi.string().required().messages({ 'any.required': 'Username is required' }),
    password: Joi.string().required().messages({ 'any.required': 'Password is required' }),
  }),
};

module.exports = authSchemas;
