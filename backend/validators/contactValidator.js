const Joi = require('joi');

const contactSchemas = {
  contact: Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
      .messages({ 'string.min': 'Name must be at least 2 characters' }),
    email: Joi.string().trim().email().required()
      .messages({ 'string.email': 'Please provide a valid email' }),
    message: Joi.string().trim().min(10).max(2000).required()
      .messages({ 'string.min': 'Message must be at least 10 characters' }),
  }),
};

module.exports = contactSchemas;
