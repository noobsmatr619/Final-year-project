const path = require("path");
const { sendServerError } = require("./../utils/errors/serverError");
const asyncHandler = require("../middleware/async");
//@desc Upload Public Assets
//@route POST /api/v1/uploads/publicUploads
//@access public
exports.publicUploads = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return sendServerError(res, 400, `Please upload a file`);
  }

  const file = req.files.publicUpload;
  if (!file) {
    return sendServerError(res, 400, `Please upload a file`);
  }
  // Make sure the image is a photo
  // Check filesize
  if (!file.mimetype.startsWith("image")) {
    if (file.size > 1000000) {
      return sendServerError(res, 400, `Please upload an image less than 1MB`);
    }
  }
  const timeNow = Date.now();
  console.log(timeNow);
  file.name = `file-${Math.random(1, 100000)}-${timeNow}-uploads-${Math.random(
    1,
    100000
  )}${path.parse(file.name).ext}`;

  file.mv(`./public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return sendServerError(res, 500, `Problem With File Upload`);
    }

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
