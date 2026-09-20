const Joi = require('joi');

const profileSchemas = {
  profileUpdate: Joi.object({
    name: Joi.string().trim().min(2).max(100),
    title: Joi.string().trim().max(200),
    heroText: Joi.string().trim().max(1000),
    typeAnimationText: Joi.string().trim().max(500),
    aboutText: Joi.string().trim().max(3000),
    email: Joi.string().trim().email(),
    phone: Joi.string().trim().allow('').max(50),
    location: Joi.string().trim().allow('').max(200),
    footerText: Joi.string().trim().allow('').max(500),
  }),
};

module.exports = profileSchemas;
