const Team = require("../Models/Team");
const Member = require("../Models/TeamMembers");

const { sendServerError } = require("./../utils/errors/serverError");
//@desc Create Task
//@route POST /api/v1/teams/createTeam
//@access private

exports.createTeam = async (req, res, next) => {
  const { name, members } = req.body;

  try {
    const team = await Team.create({
      name,
    });
    const id = team._id;
    for (let i = 0; i < members.length; i++) {
      await Member.create({
        memberId: members[i].memberId,
        memberName: members[i].memberName,
        team: id,
      });
    }
    res.status(200).json({
      message: "Team Added Succsfull",
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, "Server Error");
  }
};

exports.getAllTeams = async (req, res, next) => {
  try {
    const tasks = await Member.find({}).populate({
      path: "team",
    });
    return res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Get All Tasks
//@route GET /api/v1/teams/getMyTeams
//@access private

exports.getMyTeams = async (req, res, next) => {
  const id = req.user.id;
  try {
    const tasks = await Member.find({
      memberId: id,
    }).populate({
      path: "team",
    });
    return res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};
