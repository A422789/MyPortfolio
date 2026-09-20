require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');
const path = require('path');
const fs = require('fs');

// Route imports
const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists (for multer temp files)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// ── Security Middleware ──
app.set('trust proxy', 1);
app.use(helmet());

// Dynamic CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5174',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(s => s.trim()) : []),
  ...(process.env.ADMIN_URL ? process.env.ADMIN_URL.split(',').map(s => s.trim()) : []),
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()) : []),
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

app.use(mongoSanitize()); // Prevent NoSQL injection

// ── Body Parsers ──
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── General Rate Limiter ──
app.use('/api', generalLimiter);

// ── Request Logging ──
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} — ${req.ip}`);
  next();
});

// ── Routes ──
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// ── Health Check ──
const startTime = Date.now();
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ── 404 Handler ──
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ── Centralized Error Handler ──
app.use(errorHandler);

// ── Start Server ──
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();

module.exports = app;
