const Health = require('../Models/Health');
const _ = require('lodash');
const multiparty = require('multiparty');
const { dataUri } = require('../upload');
const { uploader } = require('../config/cloudinaryConfiguration');
const { sendServerError } = require('./../utils/errors/serverError');

// Canvas v1
// const Canvas = require("canvas");
// Canvas v2
// var { createCanvas } = require("canvas");

// // Canvas v1
// var canvas = new Canvas();
// // Canvas v2

/**
 * Test route for Bar code implementation**/
//create accident controller 
exports.createAccident = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
      console.log(req.file);
      await Health.create({
        ...req.body,
        user: req.user.id,
        image: req.file.path
      });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

exports.getAccident = async (req, res, next) => {
  try {
    const get = await Health.find({});
    res.status(200).json({ data: get });
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

exports.getlLocationAccident = async (req, res, next) => {
  try {
    var data = [];
    const get = await Health.find({});
    const getlocation = await Health.find({}).select('location');
    const uniq = _.uniqBy(getlocation, 'location');
    const Asyn = new Promise((resolve, reject) => {
      if (getlocation.length === 0) {
        resolve();
      }
      uniq.forEach((dd, index1, array1) => {
        var arr = [];
        get.forEach((d, index, array) => {
          if (dd.location === d.location) {
            arr.push(d);
          }
          console.log(array.length - 1);
          if (index === array.length - 1) {
            if (arr.length >= 3) {
              arr.forEach((ss) => {
                console.log(ss);
                data.push(ss);
              });
              arr = [];
            }
          }
        });
        if (index1 === array1.length - 1) {
          resolve();
        }
      });
    });
    Asyn.then(() => res.status(200).json({ data: data }));
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

exports.getSingleHealth = async (req, res, next) => {
  try {
    const health = await Health.findOne({ _id: req.params.id });
    if (!health) {
      return sendServerError(res, 404, 'Record not found');
    }
    res.status(200).json(health);
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

exports.updateSingleHealth = async (req, res, next) => {
  try {
    const health = await Health.findOne({ _id: req.params.id });
    if (!health) {
      return sendServerError(res, 404, 'Record not found');
    }
    req.body.location = req.body.Location;
    await Health.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json();
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc Create Product
//@route POST /api/v1/products/createProduct
//@access private
