// controllers/authController.js

// =============================
// DEMO MODE (no database)
// =============================
const demoLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const mockUser = {
      id: '1',
      email,
      name: 'Demo User',
      karmaPoints: 100
    };

    const token = 'demo-token-' + Date.now();

    res.json({
      success: true,
      token,
      user: mockUser,
      message: 'Login successful (Demo Mode)'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

const demoRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const mockUser = {
      id: '1',
      email,
      name,
      karmaPoints: 50
    };

    const token = 'demo-token-' + Date.now();

    res.json({
      success: true,
      token,
      user: mockUser,
      message: 'Registration successful (Demo Mode)'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

module.exports = { 
  login: demoLogin,
  register: demoRegister
};

/*
// =============================
// REAL DATABASE MODE
// =============================
const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const { formatResponse } = require('../utils/helpers');

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, phone, password, age, gender, emergencyContact } = req.body;

      const existingUser = await User.findOne({ 
        $or: [{ email }, { phone }] 
      });

      if (existingUser) {
        return res.status(400).json(
          formatResponse(false, null, 'User already exists with this email or phone')
        );
      }

      const user = new User({
        name,
        email,
        phone,
        password,
        age,
        gender,
        emergencyContact,
        isVerified: true
      });

      await user.save();

      const token = generateToken({ userId: user._id });

      res.status(201).json(
        formatResponse(true, { user, token }, 'User registered successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json(
          formatResponse(false, null, 'Invalid credentials')
        );
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json(
          formatResponse(false, null, 'Invalid credentials')
        );
      }

      user.isOnline = true;
      user.lastSeen = new Date();
      await user.save();

      const token = generateToken({ userId: user._id });

      res.json(
        formatResponse(true, { user, token }, 'Login successful')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async logout(req, res) {
    try {
      const user = await User.findById(req.user._id);
      user.isOnline = false;
      user.lastSeen = new Date();
      await user.save();

      res.json(
        formatResponse(true, null, 'Logout successful')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user._id);
      res.json(
        formatResponse(true, { user }, 'Profile retrieved successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async updateProfile(req, res) {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true, runValidators: true }
      );

      res.json(
        formatResponse(true, { user }, 'Profile updated successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async updateLocation(req, res) {
    try {
      const { latitude, longitude } = req.body;
      
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { 
          location: { 
            latitude, 
            longitude, 
            lastUpdated: new Date() 
          } 
        },
        { new: true }
      );

      res.json(
        formatResponse(true, { location: user.location }, 'Location updated successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
}

module.exports = AuthController;
*/
