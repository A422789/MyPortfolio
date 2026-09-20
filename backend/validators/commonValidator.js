const Joi = require('joi');

const commonSchemas = {
  objectId: Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      .messages({ 'string.pattern.base': 'Invalid ID format' }),
  }),
};

module.exports = commonSchemas;
