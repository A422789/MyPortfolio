const Joi = require('joi');

const certificateSchemas = {
  certificate: Joi.object({
    title: Joi.string().trim().required().max(300),
    issuer: Joi.string().trim().allow('').max(200),
    completionDate: Joi.string().trim().allow('').max(100),
    verifyLink: Joi.string().trim().allow('').uri(),
    order: Joi.number().integer().min(0),
  }),
};

module.exports = certificateSchemas;
