const Journey = require('../models/Journey');
const PNRService = require('../services/pnrService');
const { formatResponse } = require('../utils/helpers');

class JourneyController {
  static async createJourney(req, res) {
    try {
      const journeyData = req.body;
      journeyData.userId = req.user._id;

      // Verify PNR
      const pnrVerification = await PNRService.verifyPNR(journeyData.pnr);
      if (!pnrVerification.success) {
        return res.status(400).json(
          formatResponse(false, null, 'PNR verification failed')
        );
      }

      // Encrypt PNR before saving
      journeyData.pnr = PNRService.encryptPNR(journeyData.pnr);

      const journey = new Journey(journeyData);
      await journey.save();

      // Populate user data
      await journey.populate('userId');

      res.status(201).json(
        formatResponse(true, { journey }, 'Journey created successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getMyJourneys(req, res) {
    try {
      const { status = 'active', page = 1, limit = 10 } = req.query;
      
      const journeys = await Journey.find({ 
        userId: req.user._id,
        ...(status !== 'all' && { status })
      })
      .populate('userId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

      const total = await Journey.countDocuments({ 
        userId: req.user._id,
        ...(status !== 'all' && { status })
      });

      res.json(
        formatResponse(true, { 
          journeys, 
          pagination: { 
            page: parseInt(page), 
            limit: parseInt(limit), 
            total,
            pages: Math.ceil(total / limit)
          } 
        }, 'Journeys retrieved successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getJourney(req, res) {
    try {
      const journey = await Journey.findOne({
        _id: req.params.id,
        userId: req.user._id
      }).populate('userId');

      if (!journey) {
        return res.status(404).json(
          formatResponse(false, null, 'Journey not found')
        );
      }

      res.json(
        formatResponse(true, { journey }, 'Journey retrieved successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async updateJourney(req, res) {
    try {
      const journey = await Journey.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true, runValidators: true }
      ).populate('userId');

      if (!journey) {
        return res.status(404).json(
          formatResponse(false, null, 'Journey not found')
        );
      }

      res.json(
        formatResponse(true, { journey }, 'Journey updated successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async deleteJourney(req, res) {
    try {
      const journey = await Journey.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!journey) {
        return res.status(404).json(
          formatResponse(false, null, 'Journey not found')
        );
      }

      res.json(
        formatResponse(true, null, 'Journey deleted successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async verifyPNR(req, res) {
    try {
      const { pnr } = req.body;
      
      const verification = await PNRService.verifyPNR(pnr);
      
      if (!verification.success) {
        return res.status(400).json(
          formatResponse(false, null, 'Invalid PNR')
        );
      }

      res.json(
        formatResponse(true, verification.data, 'PNR verified successfully')
      );
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
}

module.exports = JourneyController;