const express = require('express');
const uploadRoute = express.Router();
const upload = require("../middleware/multerMiddleware");
const { uploadVideo, uploadImage } = require('../controller/uploadController');

uploadRoute.post('/video', upload.single('video'), uploadVideo);
uploadRoute.post('/image', upload.single('image'), uploadImage);

module.exports = uploadRoute;