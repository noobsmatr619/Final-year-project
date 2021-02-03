const User = require('../Models/User');
const TempUser = require('../Models/TempUser');
const bcrypt = require('bcryptjs');
const { sendServerError } = require('./../utils/errors/serverError');
const asyncHandler = require('../middleware/async');
/*

For Registration of a user
either admin, employee or manager

*/
const registerUser = async (body) => {
  const { email, password, type, displayName } = body;
  try {
    console.log(type);
    const user = await User.create({
      email,
      displayName,
      password,
      type
    });
    return { success: true, user: user };
  } catch (error) {
    console.log(error, error.message);
    return { success: false, user: null, error: error.message };
  }
};
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};
exports.registerAdmin = async (req, res, next) => {
  const body = req.body;
  const data = await registerUser(body);
  if (data.success) {
    sendTokenResponse(data.user, 200, res);
  } else {
    return sendServerError(res, 500, 'Server Error');
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Please Provide an email and password'
    });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      error: 'Invalid Credentials'
    });
  }

  //check if password matches
  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    return res.status(401).json({
      error: 'Invalid Credentials'
    });
  }
  //getting token
  sendTokenResponse(user, 200, res);
};
//Getting My Own Profile

exports.getMe = async (req, res, next) => {
  return res.status(200).json({
    data: req.user
  });
};

//Getting Any User Details

exports.getUserDetails = async (req, res, next) => {
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'No User Found'
      });
    }
    res.status(200).json({
      data: user
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
};

//@desc Update Password
//@route POST /api/v1/auth/updatePassword
//@access private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { password, newPassword } = req.body;
  const id = req.user.id;
  const email = req.user.email;
  //Validate email and password
  if (!password || !newPassword) {
    return sendServerError(
      res,
      400,
      'Please Provide Both Old And New Passwords'
    );
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return sendServerError(res, 401, 'Invalid Credentials');
  }

  //check if password matches
  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    return sendServerError(res, 401, 'Wrong Old Password Provided');
  }
  //getting token

  try {
    const salt = await bcrypt.genSalt(10);
    const updateDPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id
      },
      {
        password: updateDPassword
      }
    );
    return res.status(200).json({
      success: true,
      message: 'Password Updated Successfully'
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});

//@desc Update Profile Details
//@route POST /api/v1/auth/updateProfile
//@access private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { displayName } = req.body;
  const id = req.user.id;
  try {
    await User.findByIdAndUpdate(id, {
      displayName
    });
    res.status(200).json({
      success: true,
      messsage: 'Data Updated Successfully'
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});

//@desc Update Role
//@route POST /api/v1/auth/updateRole
//@access private
exports.updateRole = asyncHandler(async (req, res, next) => {
  const { type, id } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      type
    });
    res.status(200).json({
      success: true,
      messsage: 'Data Updated Successfully'
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});

//@desc Approve User
//@route POST /api/v1/auth/approveuser
//@access private
exports.approveuser = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      status: true
    });
    res.status(200).json({
      success: true,
      messsage: 'Data Updated Successfully'
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});

//@desc Get All Users
//@route GET /api/v1/auth/getAllUsers
//@access private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ type: { $ne: 'admin' } });
    res.status(200).json({
      data: users
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});
exports.getEmployeeAndStaff = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ type: { $nin: ['admin', 'manager'] } });
    res.status(200).json({
      data: users
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});
//@desc Get All Users
//@route GET /api/v1/auth/getAllEmployees
//@access private
exports.getAllEmployees = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ type: 'employee' });
    res.status(200).json({
      data: users
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});
exports.getAllStaff = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ type: 'staff' });
    res.status(200).json({
      data: users
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
});

//@desc Request Change Account Details
//@route POST /api/v1/auth/requestAccountChangeDetails
//@access private
exports.requestAccountChangeDetails = asyncHandler(async (req, res, next) => {
  const { email, displayName } = req.body;
  const user = req.user.id;
  try {
    const isAlready = await User.findOne({ _id: user });
    console.log(isAlready);
    if (isAlready) {
      await User.findOneAndUpdate(
        {
          _id: user
        },
        {
          email,
          displayName,
          updatedAt: new Date()
        }
      );
      return res.status(200).json({
        message: 'Account Details Change Request Updated Successfully'
      });
    } else {
      await TempUser.create({
        email,
        displayName,
        user
      });
      return res.status(200).json({
        message: 'Account Details Change Request Posted Successfully'
      });
    }
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, 'Server Error');
  }
});
