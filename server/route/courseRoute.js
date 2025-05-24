const express = require('express');
const { addCourse } = require('../controller/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const courseRoute = express.Router();

courseRoute.post('/add-course',authMiddleware, addCourse);

module.exports = courseRoute;