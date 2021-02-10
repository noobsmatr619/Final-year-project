const { config, uploader } = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

const cloudinaryConfig = async () => {
  try {
    await config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("cloudinaryConfig running .......");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = { cloudinaryConfig, uploader };
