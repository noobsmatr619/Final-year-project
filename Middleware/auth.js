const jwt = require("jsonwebtoken");
const { sendServerError } = require("./../utils/errors/serverError");
require("dotenv").config();
const User = require("../Models/User");
exports.protect = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  //Make Sure Token exists
  if (!token) {
    return sendServerError(res, 401, "Not Authorized to Access this route");
  }
  //verifying token
  try {
    console.log("object");
    console.log(token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("object");

    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return sendServerError(res, 401, "Not Authorized to Access this route");
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
