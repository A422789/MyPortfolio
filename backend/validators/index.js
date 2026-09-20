const authSchemas = require('./authValidator');
const contactSchemas = require('./contactValidator');
const profileSchemas = require('./profileValidator');
const projectSchemas = require('./projectValidator');
const skillSchemas = require('./skillValidator');
const certificateSchemas = require('./certificateValidator');
const socialLinkSchemas = require('./socialLinkValidator');
const commonSchemas = require('./commonValidator');

const schemas = {
  ...authSchemas,
  ...contactSchemas,
  ...profileSchemas,
  ...projectSchemas,
  ...skillSchemas,
  ...certificateSchemas,
  ...socialLinkSchemas,
  ...commonSchemas,
};

module.exports = schemas;
