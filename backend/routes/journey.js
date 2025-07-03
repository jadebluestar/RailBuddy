const express = require('express');
const router = express.Router();
const JourneyController = require('../controllers/journeyController');
const auth = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

router.use(auth);

router.post('/', validateRequest(schemas.journey), JourneyController.createJourney);
router.get('/', JourneyController.getMyJourneys);
router.get('/:id', JourneyController.getJourney);
router.put('/:id', JourneyController.updateJourney);
router.delete('/:id', JourneyController.deleteJourney);
router.post('/verify-pnr', JourneyController.verifyPNR);

module.exports = router;
