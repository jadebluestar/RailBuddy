// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

// ========================
// DEMO MODE - Minimal Server with Socket.IO
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
app.use('/api/user', require('./routes/user'));

// Health check / sanity check
app.get('/', (req, res) => {
  res.json({ message: 'RailBuddy Backend is running!' });
});

// Create HTTP server and Socket.IO instance
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  // Handle authentication with token
  socket.on('authenticate', (data) => {
    console.log('🔐 Authentication attempt:', data);
    // Add your authentication logic here
    socket.emit('authenticated', { success: true });
  });
  
  // Handle chat messages
  socket.on('message', (data) => {
    console.log('💬 Message received:', data);
    // Echo the message back or broadcast to other users
    socket.emit('message', data);
  });
  
  // Handle disconnect
  socket.on('disconnect', (reason) => {
    console.log('🔌 User disconnected:', socket.id, 'Reason:', reason);
  });
});

// Start server - IMPORTANT: Use server.listen(), not app.listen()
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
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