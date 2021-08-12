const User = require('../Models/User');
const TempUser = require('../Models/TempUser');
const bcrypt = require('bcryptjs');
const { sendServerError } = require('./../utils/errors/serverError');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
});
exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      isPaid: true
    });
    res.status(200).json({
      success: true,
      messsage: 'Data Updated Successfully'
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
});

//@desc Get All Users
//@route GET /api/v1/auth/getAllUsers
//@access private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      data: users
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
});
exports.getEmployeeAndStaff = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ type: { $nin: ['admin', 'manager'] } });
    res.status(200).json({
      data: users
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
});
exports.getAllStaff = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ type: 'staff' });
    res.status(200).json({
      data: users
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
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
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.params);
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      return sendServerError(res, 404, 'User not found');
    }
    await user.remove();
    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
});

exports.searchUsers = asyncHandler(async (req, res, next) => {
  try {
    let users = [];
    if (req.query.displayName) {
      await User.find({
        displayName: new RegExp(req.query.displayName, 'i')
      });
    } else {
      users = await User.find();
    }
    res.status(200).json({ data: users });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
});

// Forgot Password   =>  /password/forgot
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return sendServerError(res, 404, 'User not found with this email');
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Local forgot password url
  const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;

  // Create reset password url
  // const resetUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'DMC Password Recovery',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return sendServerError(res, 500, error.message);
  }
});

// Reset Password   =>  /password/reset/:token
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return sendServerError(
      res,
      400,
      'Password reset token is invalid or has been expired'
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return sendServerError(res, 400, 'Password does not match');
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: `Your password successfully changed`
  });
});
