// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// ========================
// DEMO MODE - Minimal Server
// ========================

// CORS to allow your frontend (React / Vite etc.)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Body parsing
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health check / sanity check
app.get('/', (req, res) => {
  res.json({ message: 'RailBuddy Backend is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


/*
==================================================
REFERENCE: OLD VERSION FEATURES (commented out)
==================================================

// Helmet for security
// app.use(helmet());

// Rate limiting
// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// app.use('/api', limiter);

// Logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// Socket.io
// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const server = createServer(app);
// const io = new Server(server, { cors: {...} });
// socketManager(io);

// Additional routes
// app.use('/api/journey', journeyRoutes);
// app.use('/api/match', matchRoutes);
// app.use('/api/chat', chatRoutes);

// Error handler
// app.use(errorHandler);

// 404 handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

*/
