const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { Readable } = require("stream");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name_cloudinary,
  api_key: process.env.api_key_cloudinary,
  api_secret: process.env.api_secret_cloudinary,
});

const uploadToCloudinary = (ressourceType, folderPath, buffer) => {
  return new Promise((resolve, reject) => {
    const streamTransformer = cloudinary.uploader.upload_stream(
      { ressource_type: ressourceType, folder: folderPath },
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(streamTransformer);
  });
};

const uploadCVpdf = async (buffer) => {
  return await uploadToCloudinary(
    "application/pdf",
    "JobApplyTracker/CVpdf",
    buffer
  );
};

const uploadProfilePicture = async (buffer) => {
  return await uploadToCloudinary(
    "image/png",
    "JobApplyTracker/profilePicture",
    buffer
  );
};

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadFields = upload.fields([
  { name: "CVpdf", maxCount: 1 },
  { name: "pictureProfile", maxCount: 1 },
]);

module.exports = {
  uploadFields,
  uploadCVpdf,
  uploadProfilePicture,
};
