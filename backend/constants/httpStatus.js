const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const MESSAGES = {
  SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Unauthorized access. Token is missing or invalid.',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation failed',
  SUCCESS: 'Operation completed successfully',
};

module.exports = {
  HTTP_STATUS,
  MESSAGES,
};
