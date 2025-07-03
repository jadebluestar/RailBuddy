const Journey = require('../models/Journey');
const User = require('../models/User');
const Match = require('../models/Match');
const { generateChatRoom, calculateDistance } = require('../utils/helpers');

class MatchingService {
  static async findMatches(journeyId) {
    try {
      const journey = await Journey.findById(journeyId).populate('userId');
      if (!journey) throw new Error('Journey not found');

      // Find potential matches
      const potentialMatches = await this.findPotentialMatches(journey);
      
      // Score and rank matches
      const scoredMatches = await this.scoreMatches(journey, potentialMatches);
      
      // Return top matches
      return scoredMatches.slice(0, 10);
    } catch (error) {
      throw new Error(`Matching failed: ${error.message}`);
    }
  }

  static async findPotentialMatches(journey) {
    const query = {
      _id: { $ne: journey._id }, // Exclude self
      trainNumber: journey.trainNumber,
      date: journey.date,
      status: 'active',
      isLookingForExchange: true
    };

    return await Journey.find(query).populate('userId');
  }

  static async scoreMatches(userJourney, potentialMatches) {
    const scoredMatches = [];

    for (const match of potentialMatches) {
      const score = await this.calculateMatchScore(userJourney, match);
      
      if (score >= 60) { // Minimum threshold
        scoredMatches.push({
          journey: match,
          user: match.userId,
          score: Math.round(score),
          reasons: this.getMatchReasons(userJourney, match, score)
        });
      }
    }

    // Sort by score descending
    return scoredMatches.sort((a, b) => b.score - a.score);
  }

  static async calculateMatchScore(journey1, journey2) {
    let score = 0;
    const weights = {
      seatCompatibility: 40,
      genderPreference: 25,
      userRating: 15,
      experience: 10,
      location: 10
    };

    // 1. Seat Compatibility (40 points)
    score += this.calculateSeatCompatibility(journey1, journey2) * weights.seatCompatibility / 100;

    // 2. Gender Preference (25 points)
    score += this.calculateGenderCompatibility(journey1, journey2) * weights.genderPreference / 100;

    // 3. User Rating (15 points)
    score += this.calculateRatingScore(journey1.userId, journey2.userId) * weights.userRating / 100;

    // 4. Experience Level (10 points)
    score += this.calculateExperienceScore(journey1.userId, journey2.userId) * weights.experience / 100;

    // 5. Location Proximity (10 points)
    score += this.calculateLocationScore(journey1.userId, journey2.userId) * weights.location / 100;

    return Math.min(score, 100);
  }

  static calculateSeatCompatibility(journey1, journey2) {
    const j1Current = journey1.currentSeat;
    const j1Desired = journey1.desiredSeat;
    const j2Current = journey2.currentSeat;
    const j2Desired = journey2.desiredSeat;

    let compatibility = 0;

    // Perfect match: Each person's current seat matches other's desired seat
    if (j1Current.type === j2Desired.type && j2Current.type === j1Desired.type) {
      compatibility = 100;
    }
    // Good match: At least one person gets their desired seat
    else if (j1Current.type === j2Desired.type || j2Current.type === j1Desired.type) {
      compatibility = 75;
    }
    // Acceptable match: Both have compatible class
    else if (j1Current.class === j2Desired.class && j2Current.class === j1Desired.class) {
      compatibility = 50;
    }
    // Minimum match: Same class
    else if (j1Current.class === j2Current.class) {
      compatibility = 25;
    }

    return compatibility;
  }

  static calculateGenderCompatibility(journey1, journey2) {
    const user1 = journey1.userId;
    const user2 = journey2.userId;
    
    const pref1 = journey1.preferences?.genderPreference || user1.preferences?.genderPreference || 'any';
    const pref2 = journey2.preferences?.genderPreference || user2.preferences?.genderPreference || 'any';

    // Both prefer any gender
    if (pref1 === 'any' && pref2 === 'any') return 100;

    // Check if preferences are satisfied
    let score = 0;
    
    if (pref1 === 'any' || this.isGenderPreferenceSatisfied(pref1, user1.gender, user2.gender)) {
      score += 50;
    }
    
    if (pref2 === 'any' || this.isGenderPreferenceSatisfied(pref2, user2.gender, user1.gender)) {
      score += 50;
    }

    return score;
  }

  static isGenderPreferenceSatisfied(preference, userGender, otherGender) {
    switch (preference) {
      case 'same':
        return userGender === otherGender;
      case 'opposite':
        return userGender !== otherGender;
      case 'any':
      default:
        return true;
    }
  }

  static calculateRatingScore(user1, user2) {
    const avgRating = (user1.rating + user2.rating) / 2;
    return (avgRating / 5) * 100;
  }

  static calculateExperienceScore(user1, user2) {
    const avgExperience = (user1.totalExchanges + user2.totalExchanges) / 2;
    return Math.min(avgExperience * 10, 100);
  }

  static calculateLocationScore(user1, user2) {
    if (!user1.location || !user2.location) return 50; // Neutral if no location

    const distance = calculateDistance(
      user1.location.latitude,
      user1.location.longitude,
      user2.location.latitude,
      user2.location.longitude
    );

    // Closer is better (within 10km = 100 points, beyond 100km = 0 points)
    return Math.max(0, 100 - distance);
  }

  static getMatchReasons(journey1, journey2, score) {
    const reasons = [];
    
    if (this.calculateSeatCompatibility(journey1, journey2) >= 75) {
      reasons.push('Perfect seat match');
    }
    
    if (this.calculateGenderCompatibility(journey1, journey2) === 100) {
      reasons.push('Gender preference satisfied');
    }
    
    if (journey2.userId.rating >= 4.5) {
      reasons.push('Highly rated user');
    }
    
    if (journey2.userId.totalExchanges >= 5) {
      reasons.push('Experienced exchanger');
    }

    return reasons;
  }

  static async createMatch(journey1Id, journey2Id, initiatedBy) {
    try {
      const journey1 = await Journey.findById(journey1Id);
      const journey2 = await Journey.findById(journey2Id);

      if (!journey1 || !journey2) {
        throw new Error('Journey not found');
      }

      // Check if match already exists
      const existingMatch = await Match.findOne({
        $or: [
          { journey1: journey1Id, journey2: journey2Id },
          { journey1: journey2Id, journey2: journey1Id }
        ]
      });

      if (existingMatch) {
        throw new Error('Match already exists');
      }

      const matchScore = await this.calculateMatchScore(journey1, journey2);
      const chatRoom = generateChatRoom();

      const match = new Match({
        journey1: journey1Id,
        journey2: journey2Id,
        user1: journey1.userId,
        user2: journey2.userId,
        matchScore,
        initiatedBy,
        chatRoom
      });

      await match.save();
      return await Match.findById(match._id)
        .populate('journey1')
        .populate('journey2')
        .populate('user1')
        .populate('user2');
    } catch (error) {
      throw new Error(`Match creation failed: ${error.message}`);
    }
  }
}

module.exports = MatchingService;
