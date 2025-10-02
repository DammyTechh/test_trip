const jwt = require('jsonwebtoken');
const { getUserRepository } = require('../models');
const { errorResponseMsg } = require('../utils/response');
require('dotenv').config();

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const userRepository = getUserRepository();
      const user = await userRepository.findOne({ 
        where: { user_id: decoded.id },
        select: ['user_id', 'first_name', 'last_name', 'email', 'phone_number', 'is_verified', 'is_onboarded', 'usertype_id', 'travel_frequency', 'budget_range']
      });
      
      if (!user) {
        return errorResponseMsg(res, 401, 'User not found');
      }
      
      if (!user.is_verified) {
        return errorResponseMsg(res, 403, 'Account not verified');
      }
      
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return errorResponseMsg(res, 401, 'Token expired, please login again');
      } else if (error.name === 'JsonWebTokenError') {
        return errorResponseMsg(res, 401, 'Invalid token');
      } else {
        return errorResponseMsg(res, 401, 'Not authorized, token failed');
      }
    }
  }

  if (!token) {
    return errorResponseMsg(res, 401, 'Not authorized, no token');
  }
};

module.exports = { protect };