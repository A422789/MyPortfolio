const Joi = require('joi');

const skillSchemas = {
  skill: Joi.object({
    name: Joi.string().trim().required().max(100),
    category: Joi.string().trim().allow('').max(100),
    iconSvg: Joi.string().allow('').max(10000),
    order: Joi.number().integer().min(0),
    isHidden: Joi.boolean(),
  }),
};

module.exports = skillSchemas;
