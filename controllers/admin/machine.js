const Machine = require('../../Models/Machine');
const { sendServerError } = require('./../../utils/errors/serverError');

//@desc Create New Machine
//@route POST /api/v1/admin/machines/addNewMachine
//@access private

exports.addNewMachine = async (req, res, next) => {
  const { name, model, build, target, status } = req.body;
  try {
    const machine = await Machine.create({
      name,
      model,
      build,
      status,
      target
    });
    res.status(200).json({
      data: machine,
      message: 'Machine Added Succsfull'
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Get All Mchines
//@route GET /api/v1/admin/machines/getAllMachines
//@access private

exports.getAllMachines = async (req, res, next) => {
  try {
    //old code
    // const machines = await Machine.find({ status: 1 });
    //new one
    const machines = await Machine.find();
    res.status(200).json({
      data: machines
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

exports.getAllMachinesWithAnyStatus = async (req, res, next) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

exports.getSingleMachineDetails = async (req, res, next) => {
  try {
    const machine = await Machine.findById({ _id: req.params.machineId });
    console.log('machine');
    console.log(machine);
    res.status(200).json(machine);
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Get Single Machine
//@route GET /api/v1/admin/machines/getAllMachines?id
//@access private

exports.getSingleMachine = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return sendServerError(res, 400, 'Please Add Mahine Id');
  }
  try {
    const machines = await Machine.findById(id);
    res.status(200).json({
      data: machines
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Update Machine
//@route POST /api/v1/admin/machines/updateMachine
//@access private

exports.updateMachine = async (req, res, next) => {
  const { id, name, model, build, target, status } = req.body;
  if (!id) {
    return sendServerError(res, 400, 'Please Add Mahine Id');
  }
  try {
    await Machine.findByIdAndUpdate(id, {
      name,
      model,
      build,
      status,
      target
    });
    res.status(200).json({
      message: 'Machine updated Successfully'
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Update Machine
//@route POST /api/v1/admin/machines/deleteMachine
//@access private

exports.deleteMachine = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return sendServerError(res, 400, 'Please Add Mahine Id');
  }
  try {
    await Machine.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Machine Deleted Successfully'
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Update Machine
//@route PUT /api/v1/admin/machines/goOnMaintainanceMood
//@access private

exports.goOnMaintainanceMood = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return sendServerError(res, 400, 'Please Add Mahine Id');
  }
  try {
    await Machine.findByIdAndUpdate(id, {
      status: 0,
      stopTime: new Date()
    });
    res.status(200).json({
      message: 'Machine Go On Maintanance Mood'
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Update Machine
//@route GET /api/v1/admin/machines/getMaintainanceMoodMachines
//@access private

exports.getMaintainanceMoodMachines = async (req, res, next) => {
  try {
    const machines = await Machine.find({ status: 0 });
    res.status(200).json({
      data: machines
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

//@desc Update Target
//@route post /api/v1/admin/machines/updateMachineTarget
//@access private

exports.updateMachineTarget = async (req, res, next) => {
  const { id, target } = req.body;
  try {
    await Machine.findByIdAndUpdate(id, { target });
    res.status(200).json({
      data: 'New Target Set For next 24 Hours'
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};

exports.updateMachineInformation = async (req, res, next) => {
  const { name, target, model,id } = req.body;
  try {
    await Machine.findByIdAndUpdate(id, { name, target, model });
    res.status(200).json({
      data: 'Machine information updated, New Target Set For next 24 Hours'
    });
  } catch (error) {
    return sendServerError(res, 500, "Please check all the information is filled");
  }
};
