const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Match = require('../models/Match');
const NotificationService = require('../services/notificationService');

const socketManager = (io) => {
  // Store active connections
  const activeUsers = new Map();

  // Authentication middleware for socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        throw new Error('User not found');
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.name} connected: ${socket.id}`);
    
    // Store user connection
    activeUsers.set(socket.user._id.toString(), {
      socketId: socket.id,
      user: socket.user,
      lastSeen: new Date()
    });

    // Update user's online status
    User.findByIdAndUpdate(socket.user._id, { 
      isOnline: true, 
      lastSeen: new Date() 
    }).catch(console.error);

    // Join user to their personal room for notifications
    socket.join(`user:${socket.user._id}`);

    // Emit to all users that this user is online
    socket.broadcast.emit('userOnline', {
      userId: socket.user._id,
      name: socket.user.name
    });

    // Handle joining match rooms for chat
    socket.on('joinMatch', async (matchId) => {
      try {
        // Verify user is part of this match
        const match = await Match.findOne({
          _id: matchId,
          $or: [
            { user1: socket.user._id },
            { user2: socket.user._id }
          ]
        });

        if (!match) {
          socket.emit('error', { message: 'Match not found or unauthorized' });
          return;
        }

        socket.join(`match:${matchId}`);
        socket.emit('joinedMatch', { matchId });
        
        // Notify other user in match that this user is online
        socket.to(`match:${matchId}`).emit('userJoinedMatch', {
          userId: socket.user._id,
          name: socket.user.name,
          matchId
        });

      } catch (error) {
        socket.emit('error', { message: 'Failed to join match' });
      }
    });

    // Handle leaving match rooms
    socket.on('leaveMatch', (matchId) => {
      socket.leave(`match:${matchId}`);
      socket.to(`match:${matchId}`).emit('userLeftMatch', {
        userId: socket.user._id,
        name: socket.user.name,
        matchId
      });
    });

    // Handle sending messages
    socket.on('sendMessage', async (data) => {
      try {
        const { matchId, content, type = 'text', location } = data;

        // Verify user is part of this match
        const match = await Match.findOne({
          _id: matchId,
          $or: [
            { user1: socket.user._id },
            { user2: socket.user._id }
          ]
        });

        if (!match) {
          socket.emit('error', { message: 'Match not found or unauthorized' });
          return;
        }

        // Determine receiver
        const receiver = match.user1._id.toString() === socket.user._id.toString() 
          ? match.user2 
          : match.user1;

        // Create message
        const message = new Message({
          sender: socket.user._id,
          receiver,
          matchId,
          content,
          type,
          location
        });

        await message.save();
        await message.populate('sender', 'name avatar');
        await message.populate('receiver', 'name avatar');

        // Emit to match room
        io.to(`match:${matchId}`).emit('newMessage', {
          message,
          matchId
        });

        // Send push notification if receiver is offline
        const receiverConnection = activeUsers.get(receiver.toString());
        if (!receiverConnection) {
          await NotificationService.sendMessageNotification(receiver, {
            message,
            sender: socket.user
          });
        }

      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
      const { matchId, isTyping } = data;
      socket.to(`match:${matchId}`).emit('userTyping', {
        userId: socket.user._id,
        name: socket.user.name,
        isTyping,
        matchId
      });
    });

    // Handle location sharing
    socket.on('shareLocation', async (data) => {
      try {
        const { matchId, location } = data;

        // Verify user is part of this match
        const match = await Match.findOne({
          _id: matchId,
          $or: [
            { user1: socket.user._id },
            { user2: socket.user._id }
          ]
        });

        if (!match) {
          socket.emit('error', { message: 'Match not found or unauthorized' });
          return;
        }

        // Emit location to match room
        socket.to(`match:${matchId}`).emit('locationShared', {
          userId: socket.user._id,
          name: socket.user.name,
          location,
          matchId
        });

      } catch (error) {
        socket.emit('error', { message: 'Failed to share location' });
      }
    });

    // Handle match updates (accept/reject/complete)
    socket.on('matchUpdate', async (data) => {
      try {
        const { matchId, action, additionalData } = data;

        const match = await Match.findById(matchId)
          .populate('user1 user2 journey1 journey2');

        if (!match) {
          socket.emit('error', { message: 'Match not found' });
          return;
        }

        // Emit to both users
        io.to(`user:${match.user1._id}`).emit('matchUpdated', {
          match,
          action,
          updatedBy: socket.user._id,
          additionalData
        });

        io.to(`user:${match.user2._id}`).emit('matchUpdated', {
          match,
          action,
          updatedBy: socket.user._id,
          additionalData
        });

      } catch (error) {
        socket.emit('error', { message: 'Failed to update match' });
      }
    });

    // Handle requesting user status
    socket.on('getUserStatus', (userIds) => {
      const statuses = userIds.map(userId => ({
        userId,
        isOnline: activeUsers.has(userId.toString()),
        lastSeen: activeUsers.get(userId.toString())?.lastSeen
      }));

      socket.emit('userStatuses', statuses);
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`User ${socket.user.name} disconnected: ${socket.id}`);
      
      // Remove from active users
      activeUsers.delete(socket.user._id.toString());

      // Update user's offline status
      try {
        await User.findByIdAndUpdate(socket.user._id, { 
          isOnline: false, 
          lastSeen: new Date() 
        });
      } catch (error) {
        console.error('Failed to update user offline status:', error);
      }

      // Notify other users
      socket.broadcast.emit('userOffline', {
        userId: socket.user._id,
        name: socket.user.name,
        lastSeen: new Date()
      });
    });

    // Handle connection errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  // Utility function to emit to specific user
  const emitToUser = (userId, event, data) => {
    const userConnection = activeUsers.get(userId.toString());
    if (userConnection) {
      io.to(userConnection.socketId).emit(event, data);
      return true;
    }
    return false;
  };

  // Utility function to emit to match participants
  const emitToMatch = (matchId, event, data) => {
    io.to(`match:${matchId}`).emit(event, data);
  };

  // Utility function to get online users
  const getOnlineUsers = () => {
    return Array.from(activeUsers.values()).map(connection => ({
      userId: connection.user._id,
      name: connection.user.name,
      lastSeen: connection.lastSeen
    }));
  };

  // Utility function to check if user is online
  const isUserOnline = (userId) => {
    return activeUsers.has(userId.toString());
  };

  return {
    emitToUser,
    emitToMatch,
    getOnlineUsers,
    isUserOnline,
    activeUsers
  };
};

module.exports = socketManager;