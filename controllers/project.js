const Project = require("../Models/Project");
const { sendServerError } = require("./../utils/errors/serverError");

exports.createProject = async (req, res, next) => {
  const { project, description, dueDate } = req.body;
  //   const employee = req.user.id;
  try {
    const projectCreated = await Project.create({
      project,
      description,
      dueDate,
    });
    res.status(200).json({
      data: projectCreated,
      message: "Project Added Succsfull",
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};
exports.getAllProjects = async (req, res, next) => {
  try {
    const project = await Project.find({}).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      data: project,
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, "Server Error");
  }
};
exports.assignProject = async (req, res, next) => {
  const { id, teamId } = req.body;
  try {
    await Project.findOneAndUpdate(
      {
        _id: id,
      },
      {
        team: teamId,
        isAssigned: true,
      }
    );
    return res.status(200).json({
      message: "Project Assigned Successfully",
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};
