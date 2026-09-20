const fs = require('fs');
const logger = require('../utils/logger');

/**
 * Middleware that safely removes temporary uploaded files upon request completion or error.
 */
const cleanupTempFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) logger.error(`Failed to delete temp file: ${filePath}`, { error: err.message });
    });
  }
};

const uploadCleanup = (req, res, next) => {
  const cleanFiles = () => {
    if (req.file) {
      cleanupTempFile(req.file.path);
    }
    if (req.files) {
      if (Array.isArray(req.files)) {
        req.files.forEach((f) => cleanupTempFile(f.path));
      } else {
        Object.values(req.files).flat().forEach((f) => cleanupTempFile(f.path));
      }
    }
  };

  res.on('finish', cleanFiles);
  res.on('close', cleanFiles);
  next();
};

module.exports = {
  uploadCleanup,
  cleanupTempFile,
};
