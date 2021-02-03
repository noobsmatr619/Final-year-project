const RawMaterial = require("../Models/RawMaterial");
const { sendServerError } = require("./../utils/errors/serverError");
//@desc Create Raw Material
//@route POST /api/v1/rawMaterials/addNewRawMaterial
//@access private

exports.addNewRawMaterial = async (req, res, next) => {
  const { type, count, machine, name } = req.body;
  try {
    const rawMaterial = await RawMaterial.create({
      type,
      count,
      machine,
      name,
    });
    res.status(200).json({
      data: rawMaterial,
      message: "Raw Meterial Added Succsfull",
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Get All Raw Material
//@route GET /api/v1/rawMaterials/getAllRawMaterials
//@access private

exports.getAllRawMaterials = async (req, res, next) => {
  try {
    const rawMaterials = await RawMaterial.find({}).populate({
      path: "machine",
    });
    res.status(200).json({
      data: rawMaterials,
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Get All Raw Material Machine Wise
//@route GET /api/v1/rawMaterials/getMachineWise?machineId
//@access private

exports.getMachineWise = async (req, res, next) => {
  const { machineId } = req.query;
  if (!machineId) {
    return sendServerError(res, 400, "Please Add Mahine Id");
  }
  try {
    const rawMaterials = await RawMaterial.find({
      machine: machineId,
    });
    res.status(200).json({
      data: rawMaterials,
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Get All Raw Material Machine Wise
//@route GET /api/v1/rawMaterials/getSingle?id
//@access private

exports.getSingle = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return sendServerError(res, 400, "Please Provide Id");
  }
  try {
    const rawMaterial = await RawMaterial.findById(id);
    res.status(200).json({
      data: rawMaterial,
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Update Raw Material
//@route POST /api/v1/rawMaterials/updateRawMaterial
//@access private

exports.updateRawMaterial = async (req, res, next) => {
  const { id, type, count, machine } = req.query;
  if (!id) {
    return sendServerError(res, 400, "No Id Provided");
  }

  try {
    const rawMaterials = await RawMaterial.findbyIdAndUpdate(id, {
      type,
      count,
      machine,
    });
    res.status(200).json({
      message: "Raw Material Updated Successfully",
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Delete Raw Material
//@route POST /api/v1/rawMaterials/deleteRawMaterial
//@access private

exports.deleteRawMaterial = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return sendServerError(res, 400, "No Id Provided");
  }

  try {
    await RawMaterial.findbyIdAndDelete(id);
    res.status(200).json({
      message: "Raw Material Deleted Successfully",
    });
  } catch (error) {
    return sendServerError(res, 500, "Server Error");
  }
};

//@desc Update Status
//@route POST /api/v1/rawMaterials/putInStock
//@access private

exports.putInStock = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return sendServerError(res, 400, "No Id Provided");
  }

  try {
    await RawMaterial.findByIdAndUpdate(id, {
      status: true,
    });
    res.status(200).json({
      message: "Accepted For Stock Successfully",
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res, 500, "Server Error");
  }
};
