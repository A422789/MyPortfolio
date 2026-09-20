const Joi = require('joi');

const socialLinkSchemas = {
  socialLink: Joi.object({
    platform: Joi.string().trim().required().max(100),
    url: Joi.string().trim().uri().required(),
    iconSvg: Joi.string().allow('').max(10000),
    order: Joi.number().integer().min(0),
  }),
};

module.exports = socialLinkSchemas;
