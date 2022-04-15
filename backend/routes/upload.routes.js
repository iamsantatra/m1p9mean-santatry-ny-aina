const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const uploadMiddleware = require("../middleware/upload");

router.post("/upload", uploadController.uploader)

module.exports = router;
