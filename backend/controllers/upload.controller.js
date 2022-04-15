const express = require("express");
const router = express.Router();
const cloudinary = require("../configs/cloudinary.config");

exports.uploader= async (req, res, next) => {

  const uploader = async(path) => await cloudinary.uploads(path, 'Images');

  const urls = []
  const files = req.files;

  for(const file of files) {

    const { path } = file;
    const newPath = await uploader(path)
    urls.push(newPath)
    fs.unlinkSync(path)
  }

  return res.status(200).json({
    message: 'images uploady',
    data: urls
  })
}
