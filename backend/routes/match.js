const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/matchController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/journey/:journeyId', MatchController.findMatches);
router.post('/', MatchController.createMatch);
router.get('/', MatchController.getMyMatches);
router.post('/:matchId/accept', MatchController.acceptMatch);
router.post('/:matchId/reject', MatchController.rejectMatch);
router.post('/:matchId/complete', MatchController.completeMatch);

module.exports = router;
