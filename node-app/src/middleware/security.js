const helmet = require('helmet');

const securityMiddleware = [
  helmet(),
  // Add any other security middleware here
];

module.exports = securityMiddleware; 