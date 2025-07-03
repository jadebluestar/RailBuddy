// routes/auth.js

const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// =========================
// DEMO MODE: Simple routes
// =========================
router.post('/login', login);
router.post('/register', register);

module.exports = router;

/*
========================================
REAL MODE: With validation + protected routes
========================================
const AuthController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

// Public routes
router.post('/register', validateRequest(schemas.register), AuthController.register);
router.post('/login', validateRequest(schemas.login), AuthController.login);

// Protected routes
router.post('/logout', auth, AuthController.logout);
router.get('/profile', auth, AuthController.getProfile);
router.put('/profile', auth, AuthController.updateProfile);
router.put('/location', auth, AuthController.updateLocation);

module.exports = router;
*/
