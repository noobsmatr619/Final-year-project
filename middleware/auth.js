
const jwt = require('jsonwebtoken');
const { sendServerError } = require('./../utils/errors/serverError');
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config();
const User = require('../Models/User');
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //Make Sure Token exists
  if (!token) {
    return sendServerError(res, 401, 'Not Authorized to Access this route');
  }
  //verifying token
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return sendServerError(res, 401, 'Not Authorized to Access this route');
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.type)) {
      return sendServerError(
        res,
        403,
        `User role ${req.user.type} is not authorized to access this route`
      );
    }
    next();
  };
};
