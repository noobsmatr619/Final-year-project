//multer upload file used by cloudinary , remember takes only one image 
const multer = require('multer');
const { cloudinary } = require('./config/cloudinaryConfiguration');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
var multerUploads;
try {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'CRM',
      format: async () => 'jpg',
      public_id: (req, file) => file.filename
    }
  });
  multerUploads = multer({ storage: storage }).single('image');
} catch (error) {
  console.log(error);
}

module.exports = {
  multerUploads
};
