const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  getAllUsers,
  updateRole,
  login,
  getMe,
  approveuser,
  requestAccountChangeDetails,
  getAllEmployees,
  getAllStaff,
  getEmployeeAndStaff
} = require('./../controllers/auth');
const { protect } = require('./../middleware/auth');
router.post('/registerUser', registerAdmin);
router.post('/approveuser', approveuser);
router.post('/login', login);
router.post('/updateRole', updateRole);
router.get('/getAllUsers', getAllUsers);
router.get('/getStaff', getAllStaff);
router.get('/getMe', protect, getMe);
router.get('/getEmployeeAndStaff', protect, getEmployeeAndStaff);
router.get('/getAllEmployees', protect, getAllEmployees);

router.post(
  '/requestAccountChangeDetails',
  protect,
  requestAccountChangeDetails
);

module.exports = router;
