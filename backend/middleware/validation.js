const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

// Validation schemas
const schemas = {
  register: Joi.object({
    name: Joi.string().required().trim().min(2).max(50),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(18).max(100).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    emergencyContact: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().pattern(/^[6-9]\d{9}$/).required()
    }).required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  journey: Joi.object({
    pnr: Joi.string().length(10).required(),
    trainNumber: Joi.string().required(),
    trainName: Joi.string().required(),
    from: Joi.object({
      station: Joi.string().required(),
      code: Joi.string().required(),
      departure: Joi.date().required()
    }).required(),
    to: Joi.object({
      station: Joi.string().required(),
      code: Joi.string().required(),
      arrival: Joi.date().required()
    }).required(),
    date: Joi.date().required(),
    currentSeat: Joi.object({
      coach: Joi.string().required(),
      seatNumber: Joi.string().required(),
      class: Joi.string().required(),
      type: Joi.string().valid('window', 'aisle', 'middle').required()
    }).required(),
    desiredSeat: Joi.object({
      class: Joi.string().required(),
      type: Joi.string().valid('window', 'aisle', 'middle', 'any').required(),
      coachPreference: Joi.string().optional()
    }).required()
  })
};

module.exports = { validateRequest, schemas };