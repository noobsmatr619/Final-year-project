const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'PRODUCTION') dotenv.config();

const cloudinaryConfig = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('cloudinaryConfig running .......');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = { cloudinaryConfig, cloudinary };
// cloudinary config to crea and upload cloud images 