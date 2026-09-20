const cacheService = require('../services/cacheService');
const { sendSuccess } = require('../utils/responseFormatter');

/**
 * Express middleware to serve cached GET responses.
 * If cached, sends response immediately without executing controller logic.
 */
const cacheMiddleware = (ttlSeconds = 300) => (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  const cacheKey = req.originalUrl || req.url;
  const cachedData = cacheService.get(cacheKey);

  if (cachedData) {
    res.setHeader('X-Cache', 'HIT');
    return sendSuccess(res, cachedData);
  }

  res.setHeader('X-Cache', 'MISS');

  // Override res.json to capture and cache the response body
  const originalSendSuccess = sendSuccess;
  res.sendCachedSuccess = (data, message, statusCode = 200) => {
    cacheService.set(cacheKey, data, ttlSeconds);
    return originalSendSuccess(res, data, message, statusCode);
  };

  next();
};

module.exports = cacheMiddleware;
