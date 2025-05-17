require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Removes temp file after upload
const removeTemp = (path) => {
  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if (err) console.error("Ошибка удаления временного файла:", err);
    });
  }
};

// Uploads file to Cloudinary and returns URL + public_id
const uploadFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "ArzonUmra",
    });

    removeTemp(file.tempFilePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    console.error("Ошибка загрузки на Cloudinary:", err);
    throw err;
  }
};

// Deletes file from Cloudinary by public_id
const deleteFile = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result === "ok") {
      return "file deleted";
    } else {
      return "file not found or already deleted";
    }
  } catch (err) {
    console.error("Ошибка удаления с Cloudinary:", err);
    throw err;
  }
};

module.exports = { uploadFile, deleteFile, removeTemp };