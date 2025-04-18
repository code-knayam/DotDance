const logger = require('../utils/logger');

const errorHandler = (NODE_ENV) => (err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
};

module.exports = errorHandler; 