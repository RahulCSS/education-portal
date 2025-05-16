const express = require('express');
const uploadRoute = express.Router();
const upload = require("../middleware/multerMiddleware");
const { uploadVideo } = require('../controller/uploadController');

uploadRoute.post('/video', upload.single('video'), uploadVideo);

module.exports = uploadRoute;