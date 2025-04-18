const compression = require('compression');
const morgan = require('morgan');

const performanceMiddleware = [
  compression(),
  morgan('combined')
];

module.exports = performanceMiddleware; 