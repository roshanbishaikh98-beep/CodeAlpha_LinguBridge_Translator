require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const translateRouter = require('./routes/translate');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// --- Core middleware ---
app.use(express.json({ limit: '100kb' }));
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
  })
);

// --- Basic abuse protection (per IP) ---
const translateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 translation requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many translation requests. Please wait a moment and try again.',
  },
});

// --- Routes ---
app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', service: 'lingubridge-backend' });
});

app.use('/api/translate', translateLimiter, translateRouter);

// --- 404 fallback ---
app.use((req, res) => {
  res.status(404).json({ success: false, error: `No route for ${req.method} ${req.originalUrl}` });
});

// --- Central error handler ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`LinguBridge backend running on http://localhost:${PORT}`);
});
