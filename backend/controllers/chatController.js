const Message = require('../models/Message');
const Match = require('../models/Match');
const { formatResponse } = require('../utils/helpers');

class ChatController {
  static async getMessages(req, res) {
    try {
      const { matchId } = req.params;
      const { page = 1, limit = 50 } = req.query;
      
      // Verify user is part of this match
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

      const messages = await Message.find({ matchId })
        .populate('sender', 'name avatar')
        .populate('receiver', 'name avatar')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Message.countDocuments({ matchId });

      res.json(
        formatResponse(true, { 
          messages: messages.reverse(), // Reverse to get chronological order
          pagination: { 
            page: parseInt(page), 
            limit: parseInt(limit), 
            total,
            pages: Math.ceil(total / limit)
          } 
        }, 'Messages retrieved successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async sendMessage(req, res) {
    try {
      const { matchId } = req.params;
      const { content, type = 'text', location } = req.body;
      
      // Verify user is part of this match
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

      // Determine receiver
      const receiver = match.user1._id.toString() === req.user._id.toString() 
        ? match.user2 
        : match.user1;

      const message = new Message({
        sender: req.user._id,
        receiver,
        matchId,
        content,
        type,
        location
      });

      await message.save();
      await message.populate('sender', 'name avatar');
      await message.populate('receiver', 'name avatar');

      res.status(201).json(
        formatResponse(true, { message }, 'Message sent successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async markMessagesAsRead(req, res) {
    try {
      const { matchId } = req.params;
      
      await Message.updateMany(
        { 
          matchId,
          receiver: req.user._id,
          isRead: false
        },
        { 
          isRead: true,
          readAt: new Date()
        }
      );

      res.json(
        formatResponse(true, null, 'Messages marked as read')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
}

module.exports = ChatController;