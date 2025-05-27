const express = require('express');
const { addCourse, getCoursebyTutorId, getCoursebyId, deleteCourse } = require('../controller/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')
const courseRoute = express.Router();

courseRoute.post('/add-course',authMiddleware, roleMiddleware('Admin','Tutor'), addCourse);
courseRoute.get('/get-course',authMiddleware, roleMiddleware('Admin','Tutor'), getCoursebyTutorId);
courseRoute.get('/get-course-by-Id/:id',authMiddleware, roleMiddleware('Admin','Tutor'), getCoursebyId);
courseRoute.delete('/delete-course/:id',authMiddleware, roleMiddleware('Admin','Tutor'), deleteCourse);

module.exports = courseRoute;