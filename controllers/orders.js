const Order = require('../Models/Order');
const moment = require('moment');

const { sendServerError } = require('./../utils/errors/serverError');
//@desc Place Order
//@route POST /api/v1/orders/placeMyOrder
//@access private

exports.placeMyOrder = async (req, res, next) => {
  const { count, product, price, provider, assignedTo } = req.body;
  const assignedBy = req.user.id;
  try {
    const order = await Order.create({
      count,
      product,
      price,
      provider,
      assignedBy,
      assignedTo
    });
    res.status(200).json({
      data: order,
      message: 'Order Placed Succsfull'
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
};

//@desc Get Orders Employee Wise
//@route POST /api/v1/orders/getEmployeeOrders
//@access private

exports.getEmployeeOrders = async (req, res, next) => {
  const assignedTo = req.user.id;

  try {
    const orders = await Order.find({ assignedTo })
      .populate({
        path: 'assignedBy',
        select: 'displayName'
      })
      .populate({
        path: 'product',
        select: 'name'
      });
    console.log(orders);
    res.status(200).json({
      data: orders
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, 'Server Error');
  }
};

exports.processedOrder = async (req, res, next) => {
  try {
    const orders = await Order.countDocuments({ status: 3 });

    res.status(200).json({
      data: orders
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, 'Server Error');
  }
};

exports.pieChartOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: 3 });
    const week = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
    };
    orders.forEach((order) => {
      if (moment(order.date, 'MM-DD-YYYY').week() == moment().format('w')) {
        if (moment(order.date).format('dddd') == 'Monday') {
          week.monday = week.monday + 1;
        } else if (moment(order.date).format('dddd') == 'Tuesday') {
          week.tuesday = week.tuesday + 1;
        } else if (moment(order.date).format('dddd') == 'Wednesday') {
          week.wednesday = week.wednesday + 1;
        } else if (moment(order.date).format('dddd') == 'Thursday') {
          week.thursday = week.thursday + 1;
        } else if (moment(order.date).format('dddd') == 'Friday') {
          week.friday = week.friday + 1;
        } else if (moment(order.date).format('dddd') == 'Saturday') {
          week.saturday = week.saturday + 1;
        } else if (moment(order.date).format('dddd') == 'Sunday') {
          week.sunday = week.sunday + 1;
        }
      }
    });

    res.status(200).json({
      data: week
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, 'Server Error');
  }
};

exports.getEmployeeOrdersForStaffPage = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: 'assignedBy',
        select: 'displayName'
      })
      .populate({
        path: 'product',
        select: 'name'
      });
    res.status(200).json({
      data: orders
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
};
//@desc Get All Orders
//@route GET /api/v1/orders/getAllOrders
//@access private

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({
      data: orders
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
};

//@desc get Single Product
//@route GET /api/v1/orders/getSingleOrder
//@access private

exports.getSingleOrder = async (req, res, next) => {
  const { id } = req.query;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return sendServerError(res, 404, 'No Product Foundd');
    }

    return res.status(200).json({
      data: order
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
};

//@desc get Orders Analytics
//@route POST /api/v1/orders/getSalesAnalytics
//@access private

exports.getSalesAnalytics = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  try {
    const startDateInput = new Date(startDate);
    const endDateInput = new Date(endDate);
    const orders = await Order.find({
      date: {
        $gte: startDateInput,
        $lt: endDateInput
      }
    });
    return res.status(200).json({
      data: orders
    });
  } catch (error) {
    return sendServerError(res, 500, 'Server Error');
  }
};

//@desc Update Status
//@route POST /api/v1/orders/updateOrderStatus
//@access private

exports.updateOrderStatus = async (req, res, next) => {
  const { id, status } = req.body;
  if (!id) {
    return sendServerError(res, 400, 'No Id Provided');
  }

  try {
    await Order.findByIdAndUpdate(id, {
      status: status
    });
    res.status(200).json({
      message: 'Order Updated Successfully'
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, 'Server Error');
  }
};
