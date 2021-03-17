const express = require('express');
const router = express.Router();
const {
  placeMyOrder,
  getEmployeeOrders,
  updateOrderStatus,
  getEmployeeOrdersForStaffPage,
  processedOrder,
  pieChartOrders,
  plannedOrder,
  wipOrder,
  yearlyOrdersPrice,
  monthlyOrdersPrice,
  weeklyOrdersPrice
} = require('./../controllers/orders');
const { protect } = require('./../middleware/auth');
router.post('/placeMyOrder', protect, placeMyOrder);
router.post('/updateOrderStatus', protect, updateOrderStatus);
router.get('/getEmployeeOrders', protect, getEmployeeOrders);
router.get('/processedOrder', protect, processedOrder);
router.get('/wipOrder', protect, wipOrder);
router.get('/plannedOrder', protect, plannedOrder);
router.get('/pieChartOrders', protect, pieChartOrders);
router.get('/yearlyOrdersPrice', protect, yearlyOrdersPrice);
router.get('/monthlyOrdersPrice', protect, monthlyOrdersPrice);
router.get('/weeklyOrdersPrice', protect, weeklyOrdersPrice);
router.get(
  '/getEmployeeOrdersForStaffPage',
  protect,
  getEmployeeOrdersForStaffPage
);

module.exports = router;
