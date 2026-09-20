const Joi = require('joi');

const projectSchemas = {
  project: Joi.object({
    title: Joi.string().trim().required().max(200),
    description: Joi.string().trim().required().max(3000),
    techStack: Joi.alternatives().try(
      Joi.array().items(Joi.string().trim()),
      Joi.string().trim()
    ),
    repoLink: Joi.string().trim().allow('').uri(),
    liveLink: Joi.string().trim().allow('').uri(),
    order: Joi.number().integer().min(0),
    featured: Joi.boolean(),
  }),
};

module.exports = projectSchemas;
