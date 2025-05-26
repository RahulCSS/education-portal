const express = require('express');
const { addCourse, getCoursebyId } = require('../controller/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')
const courseRoute = express.Router();

courseRoute.post('/add-course',authMiddleware, roleMiddleware('Admin','Tutor'), addCourse);
courseRoute.get('/get-course',authMiddleware, roleMiddleware('Admin','Tutor'), getCoursebyId);

module.exports = courseRoute;