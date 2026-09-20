/**
 * Wraps asynchronous express route handlers to eliminate repetitive try-catch blocks.
 * Automatically passes any caught errors to express next() middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
