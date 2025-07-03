const Match = require('../models/Match');
const Journey = require('../models/Journey');
const User = require('../models/User');
const MatchingService = require('../services/matchingService');
const NotificationService = require('../services/notificationService');
const { formatResponse } = require('../utils/helpers');

class MatchController {
  static async findMatches(req, res) {
    try {
      const { journeyId } = req.params;
      
      // Verify journey belongs to user
      const journey = await Journey.findOne({
        _id: journeyId,
        userId: req.user._id
      });

      if (!journey) {
        return res.status(404).json(
          formatResponse(false, null, 'Journey not found')
        );
      }

      const matches = await MatchingService.findMatches(journeyId);

      res.json(
        formatResponse(true, { matches }, 'Matches found successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async createMatch(req, res) {
    try {
      const { journey1Id, journey2Id } = req.body;
      
      const match = await MatchingService.createMatch(
        journey1Id,
        journey2Id,
        req.user._id
      );

      // Send notification to the other user
      const otherUser = match.user1._id.toString() === req.user._id.toString() 
        ? match.user2 
        : match.user1;

      await NotificationService.sendMatchNotification(otherUser._id, {
        match,
        message: `${req.user.name} wants to exchange seats with you!`
      });

      res.status(201).json(
        formatResponse(true, { match }, 'Match created successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getMyMatches(req, res) {
    try {
      const { status = 'all', page = 1, limit = 10 } = req.query;
      
      const query = {
        $or: [
          { user1: req.user._id },
          { user2: req.user._id }
        ]
      };

      if (status !== 'all') {
        query.status = status;
      }

      const matches = await Match.find(query)
        .populate('journey1')
        .populate('journey2')
        .populate('user1')
        .populate('user2')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Match.countDocuments(query);

      res.json(
        formatResponse(true, { 
          matches, 
          pagination: { 
            page: parseInt(page), 
            limit: parseInt(limit), 
            total,
            pages: Math.ceil(total / limit)
          } 
        }, 'Matches retrieved successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async acceptMatch(req, res) {
    try {
      const { matchId } = req.params;
      
      const match = await Match.findOne({
        _id: matchId,
        $or: [
          { user1: req.user._id },
          { user2: req.user._id }
        ]
      });

      if (!match) {
        return res.status(404).json(
          formatResponse(false, null, 'Match not found')
        );
      }

      // Check if already accepted by this user
      const alreadyAccepted = match.acceptedBy.some(
        acceptance => acceptance.user.toString() === req.user._id.toString()
      );

      if (alreadyAccepted) {
        return res.status(400).json(
          formatResponse(false, null, 'Already accepted')
        );
      }

      // Add acceptance
      match.acceptedBy.push({
        user: req.user._id,
        acceptedAt: new Date()
      });

      // Update status
      if (match.acceptedBy.length === 1) {
        match.status = match.user1.toString() === req.user._id.toString() 
          ? 'user1_accepted' 
          : 'user2_accepted';
      } else if (match.acceptedBy.length === 2) {
        match.status = 'both_accepted';
        
        // Update user exchange counts
        await User.findByIdAndUpdate(match.user1, { $inc: { totalExchanges: 1 } });
        await User.findByIdAndUpdate(match.user2, { $inc: { totalExchanges: 1 } });
      }

      await match.save();

      // Populate for response
      await match.populate('journey1 journey2 user1 user2');

      // Send notification to other user
      const otherUser = match.user1._id.toString() === req.user._id.toString() 
        ? match.user2 
        : match.user1;

      await NotificationService.sendMatchNotification(otherUser._id, {
        match,
        message: match.status === 'both_accepted' 
          ? 'Match confirmed! You can now exchange seats.'
          : `${req.user.name} accepted your match request!`
      });

      res.json(
        formatResponse(true, { match }, 'Match accepted successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async rejectMatch(req, res) {
    try {
      const { matchId } = req.params;
      const { reason } = req.body;
      
      const match = await Match.findOne({
        _id: matchId,
        $or: [
          { user1: req.user._id },
          { user2: req.user._id }
        ]
      });

      if (!match) {
        return res.status(404).json(
          formatResponse(false, null, 'Match not found')
        );
      }

      match.rejectedBy.push({
        user: req.user._id,
        rejectedAt: new Date(),
        reason
      });

      match.status = 'rejected';
      await match.save();

      // Send notification to other user
      const otherUser = match.user1._id.toString() === req.user._id.toString() 
        ? match.user2 
        : match.user1;

      await NotificationService.sendMatchNotification(otherUser._id, {
        match,
        message: `${req.user.name} declined your match request.`
      });

      res.json(
        formatResponse(true, { match }, 'Match rejected successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async completeMatch(req, res) {
    try {
      const { matchId } = req.params;
      const { meetingPoint, additionalNotes } = req.body;
      
      const match = await Match.findOne({
        _id: matchId,
        $or: [
          { user1: req.user._id },
          { user2: req.user._id }
        ],
        status: 'both_accepted'
      });

      if (!match) {
        return res.status(404).json(
          formatResponse(false, null, 'Match not found or not ready for completion')
        );
      }

      match.status = 'completed';
      match.exchangeDetails = {
        confirmedAt: new Date(),
        meetingPoint,
        additionalNotes
      };

      await match.save();

      // Send confirmation to both users
      await NotificationService.sendExchangeConfirmation(match.user1, {
        match,
        message: 'Seat exchange completed successfully!'
      });

      await NotificationService.sendExchangeConfirmation(match.user2, {
        match,
        message: 'Seat exchange completed successfully!'
      });

      res.json(
        formatResponse(true, { match }, 'Match completed successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
}

module.exports = MatchController;
