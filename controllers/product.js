const JsBarcode = require('jsbarcode');
// const { createCanvas } = require("canvas");
const { DOMImplementation, XMLSerializer } = require('xmldom');
const mongoose = require('mongoose');
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const ProductMachine = require('../Models/ProductMachine');
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

exports.createBarCode = async (req, res, next) => {
  try {
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

exports.createProduct = async (req, res, next) => {
  const {
    name,
    description,
    category,
    price,
    rawMaterialsId,
    operatorNo,
    duration,
    machineId
  } = req.body;
  console.log(req.body);
  console.log('run');
  // if (req.file) {
  //   const file = dataUri(req).content;
  //   console.log(file);
  //   return uploader
  //     .upload(file)
  //     .then(async (result) => {
  try {
    const id = new mongoose.Types.ObjectId();
    // const xmlSerializer = new XMLSerializer();
    // const document = new DOMImplementation().createDocument(
    //   'http://www.w3.org/1999/xhtml',
    //   'html',
    //   null
    // );
    // const svgNode = document.createElementNS(
    //   'http://www.w3.org/2000/svg',
    //   'svg'
    // );
    // JsBarcode(svgNode, id, {
    //   xmlDocument: document
    // });
    // const barcode = xmlSerializer.serializeToString(svgNode);
    const product = await Product.create({
      _id: id,
      // barcode: barcode,
      name,
      description,
      category,
      duration,
      operatorNo,
      rawMaterials: rawMaterialsId,
      price,
      machine: machineId
    });
    const savedProduct = await product.save();

    return res.status(200).json({
      data: savedProduct,
      message: 'Product Added Succsfull'
    });
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return sendServerError(res, 500, "Please check all the information is filled");
  //     });
  // } else {
  //   return sendServerError(res, 400, 'File not found');
  // }
};

//@desc Get All Products
//@route GET /api/v1/products/getAllProducts
//@access private

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      data: products
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc get Single Product
//@route GET /api/v1/products/getSingleProduct
//@access private

exports.getSingleProduct = async (req, res, next) => {
  const { id } = req.query;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return sendServerError(res, 404, 'No Product Foundd');
    }

    return res.status(200).json({
      data: product
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc update single product
//@route POST /api/v1/products/updateSingleProduct
//@access private

exports.updateSingleProduct = async (req, res, next) => {
  const { id } = req.query;
  const { name, size, quantity, description, category, count, price, image } =
    req.body;
  try {
    await Product.findByIdAndUpdate(id, {
      name,
      size,
      quantity,
      description,
      category,
      count,
      price,
      image
    });

    return res.status(200).json({
      message: 'Product Details Updated Succesfully'
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc delete single product
//@route POST /api/v1/products/deleteSingleProduct
//@access private

exports.deleteSingleProduct = async (req, res, next) => {
  const { id } = req.body;
  try {
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Product Deleted Succesfully'
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc Add Product By a Machine In A Specific Time Period
//@route POST /api/v1/products/addProductByMachine
//@access private

exports.addProductByMachine = async (req, res, next) => {
  const { product, machine, count } = req.body;
  try {
    const productPerMachine = await ProductMachine.create({
      product,
      machine,
      count
    });
    return res.status(200).json({
      message: 'Added Succesfully'
    });
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc GET confirmation page products
//@route get /api/v1/products/getProductsProduced
//@access private

exports.getProductsProduced = async (req, res, next) => {
  try {
    const products = await ProductMachine.find({})
      .populate({
        path: 'machine',
        select: 'id name'
      })
      .populate({
        path: 'product',
        select: 'id name'
      });
    console.log('ProductMachine');
    console.log(products);

    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

exports.getProductsDone = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: 3 });
    const allProductsIds = orders.map(order => order.product)
    const products = await Product.find({ _id: allProductsIds });
    console.log('products');
    console.log(products);

    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc  Reject Products
//@route POST /api/v1/products/rejectProductsCount
//@access private

exports.rejectProductsCount = async (req, res, next) => {
  const { id, count } = req.body;
  try {
    const product = await ProductMachine.findById(id);
    const countToUpdate = product.count - count;
    await ProductMachine.findByIdAndUpdate(id, {
      count: countToUpdate
    });
    return res.status(200).json({
      success: true,
      message: 'Rejected Successfully'
    });
  } catch (error) {
    console.log(error);
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};
