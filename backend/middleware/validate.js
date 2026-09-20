const sanitizeHtml = require('sanitize-html');
const { sendError } = require('../utils/responseFormatter');
const schemas = require('../validators');

/**
 * Creates a Joi validation middleware with XSS sanitization.
 * @param {Joi.ObjectSchema} schema - The Joi schema to validate against
 * @param {'body'|'query'|'params'} property - Which part of the request to validate
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return sendError(res, 'Validation failed', 400, errors);
    }

    // Sanitize all string values in the validated body to prevent XSS
    if (property === 'body') {
      req[property] = sanitizeStrings(value);
    } else {
      req[property] = value;
    }

    next();
  };
};

/**
 * Recursively sanitize all string values in an object while preserving SVGs.
 */
function sanitizeStrings(obj) {
  if (typeof obj === 'string') {
    return sanitizeHtml(obj, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeStrings);
  }
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, val] of Object.entries(obj)) {
      // Skip sanitizing SVG fields — they contain legitimate HTML/SVG markup
      if (key === 'iconSvg') {
        sanitized[key] = val;
      } else {
        sanitized[key] = sanitizeStrings(val);
      }
    }
    return sanitized;
  }
  return obj;
}

module.exports = { validate, schemas };
