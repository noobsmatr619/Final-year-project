const Salary = require("../Models/Salary");
const User = require("../Models/User");

const { sendServerError } = require("./../utils/errors/serverError");
//@desc Pay Salary
//@route POST /api/v1/salaries/paySalary
//@access private

exports.paySalary = async (req, res, next) => {
  const { month } = req.body;
  try {
    const salary = await Salary.create({
      month,
    });
    return res.status(200).json({
      message: "Salary Paid",
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Pay Salary
//@route POST /api/v1/salaries/paySalary
//@access private

exports.getSalaries = async (req, res, next) => {
  try {
    const salaries = await Salary.find({});
    return res.status(200).json({
      data: salaries,
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};
