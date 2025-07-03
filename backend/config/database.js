// config/database.js

// ===========================
// DEMO MODE
// ===========================
// This version does NOT connect to MongoDB.
// Useful when running frontend or sockets without a real DB.
const connectDB = async () => {
  console.log('Demo mode: Skipping MongoDB connection');
  return true;
};

module.exports = connectDB;

// ===========================
// REAL DATABASE CONNECTION
// ===========================
// Uncomment this block when you want to connect
// to your actual MongoDB instance.
//
// const mongoose = require('mongoose');
//
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }
// };
//
// module.exports = connectDB;
