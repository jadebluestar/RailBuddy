const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  journey1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journey',
    required: true
  },
  journey2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journey',
    required: true
  },
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['pending', 'user1_accepted', 'user2_accepted', 'both_accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  initiatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  acceptedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    acceptedAt: {
      type: Date,
      default: Date.now
    }
  }],
  rejectedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rejectedAt: {
      type: Date,
      default: Date.now
    },
    reason: String
  }],
  exchangeDetails: {
    confirmedAt: Date,
    meetingPoint: String,
    additionalNotes: String
  },
  chatRoom: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
// Ensure no duplicate matches
matchSchema.index({ journey1: 1, journey2: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);
