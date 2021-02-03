const Task = require("../Models/Task");

const { sendServerError } = require("./../utils/errors/serverError");
//@desc Create Task
//@route POST /api/v1/tasks/createTask
//@access private

exports.createTask = async (req, res, next) => {
  const { task } = req.body;
  const employee = req.user.id;
  try {
    const taskCreated = await Task.create({
      task,
      employee,
    });
    res.status(200).json({
      data: taskCreated,
      message: "Task Added Succsfull",
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Get All Tasks
//@route GET /api/v1/tasks/getAllTasks
//@access private

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc MARk completed
//@route GET /api/v1/tasks/markCompleted
//@access private

exports.markCompleted = async (req, res, next) => {
  const { id } = req.body;
  const employee = req.user.id;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return sendServerError(res, 404, "No Task Foundd");
    }
    await Task.findOneAndUpdate(
      {
        employee: employee,
        _id: id,
      },
      {
        isCompleted: true,
      }
    );
    return res.status(200).json({
      message: "Task Completed Successfully",
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};
