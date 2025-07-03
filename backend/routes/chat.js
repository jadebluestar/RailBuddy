const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/:matchId/messages', ChatController.getMessages);
router.post('/:matchId/messages', ChatController.sendMessage);
router.put('/:matchId/read', ChatController.markMessagesAsRead);

module.exports = router;
