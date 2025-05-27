const express = require('express');
const { addCourse, getCoursebyTutorId, getCoursebyId } = require('../controller/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')
const courseRoute = express.Router();

courseRoute.post('/add-course',authMiddleware, roleMiddleware('Admin','Tutor'), addCourse);
courseRoute.get('/get-course',authMiddleware, roleMiddleware('Admin','Tutor'), getCoursebyTutorId);
courseRoute.get('/get-course-by-Id/:courseId',authMiddleware, roleMiddleware('Admin','Tutor'), getCoursebyId);

module.exports = courseRoute;