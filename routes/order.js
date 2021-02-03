const express = require('express');
const router = express.Router();
const {
  placeMyOrder,
  getEmployeeOrders,
  updateOrderStatus,
  getEmployeeOrdersForStaffPage,
  processedOrder,
  pieChartOrders
} = require('./../controllers/orders');
const { protect } = require('./../middleware/auth');
router.post('/placeMyOrder', protect, placeMyOrder);
router.post('/updateOrderStatus', protect, updateOrderStatus);
router.get('/getEmployeeOrders', protect, getEmployeeOrders);
router.get('/processedOrder', protect, processedOrder);
router.get('/pieChartOrders', protect, pieChartOrders);
router.get(
  '/getEmployeeOrdersForStaffPage',
  protect,
  getEmployeeOrdersForStaffPage
);

module.exports = router;
