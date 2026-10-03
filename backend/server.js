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
// ── Dynamic CORS Configuration ──
const configuredOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_1,
  process.env.CLIENT_URL_2,
  process.env.ADMIN_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5174',
]
  .filter(Boolean)
  .flatMap((url) => url.split(','))
  .map((url) => url.trim().replace(/\/$/, ''));

const allowedOrigins = [...new Set(configuredOrigins)];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile, curl, server-to-server)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.trim().replace(/\/$/, '');

    // Strict whitelist: explicitly configured URLs, localhost, and Vercel domains
    const isAllowed =
      allowedOrigins.includes(cleanOrigin) ||
      /^http:\/\/localhost:\d+$/.test(cleanOrigin) ||
      /\.vercel\.app$/.test(cleanOrigin);

    if (isAllowed) {
      return callback(null, true);
    }

    logger.warn(`CORS blocked for origin: ${origin}`);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
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
