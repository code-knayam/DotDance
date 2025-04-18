require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./middleware/cors');
const securityMiddleware = require('./middleware/security');
const performanceMiddleware = require('./middleware/performance');
const errorHandler = require('./middleware/errorHandler');
const qrCodesRouter = require('./routes/qrCodes');
const authRouter = require('./routes/auth');
const publicRouter = require('./routes/public');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Apply middleware
app.use(securityMiddleware);
app.use(corsMiddleware);
app.use(performanceMiddleware);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Public routes (no authentication required)
app.use('/api/public', publicRouter);

// Protected API routes
app.use('/api/auth', authRouter);
app.use('/api/qr-codes', qrCodesRouter);

// Error handling middleware
app.use(errorHandler(NODE_ENV));

// Start server
app.listen(PORT, () => {
  logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
}); 