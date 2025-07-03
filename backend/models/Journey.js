const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pnr: {
    type: String,
    required: true,
    encrypted: true
  },
  trainNumber: {
    type: String,
    required: true
  },
  trainName: {
    type: String,
    required: true
  },
  from: {
    station: String,
    code: String,
    departure: Date
  },
  to: {
    station: String,
    code: String,
    arrival: Date
  },
  date: {
    type: Date,
    required: true
  },
  currentSeat: {
    coach: String,
    seatNumber: String,
    class: String,
    type: {
      type: String,
      enum: ['window', 'aisle', 'middle']
    }
  },
  desiredSeat: {
    class: String,
    type: {
      type: String,
      enum: ['window', 'aisle', 'middle', 'any']
    },
    coachPreference: String
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  isLookingForExchange: {
    type: Boolean,
    default: true
  },
  preferences: {
    genderPreference: String,
    ageRange: {
      min: Number,
      max: Number
    },
    allowGroupTravel: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Index for efficient searching
journeySchema.index({ trainNumber: 1, date: 1 });
journeySchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Journey', journeySchema);
