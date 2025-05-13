const express = require('express');
const { signupUser, loginUser, updateUser, logoutUser, checkEmail } = require('../controller/userController');
const { getStudents, getTutors, signupTutor } = require('../controller/adminController');
const authMiddleware  = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const activityMiddleware = require('../middleware/activityMiddleware');
const userRoute = express.Router();

userRoute.post('/signup', signupUser);
userRoute.post('/login', loginUser);
userRoute.put('/update/:id', authMiddleware, updateUser);
userRoute.post('/logout/:id', authMiddleware, logoutUser);
userRoute.post('/check-email/:email', checkEmail);
userRoute.get('/get-students', authMiddleware, roleMiddleware('Admin','Tutor'), activityMiddleware, getStudents);
userRoute.get('/get-tutors', authMiddleware, roleMiddleware('Admin'), activityMiddleware, getTutors);
userRoute.post('/signup-tutor',authMiddleware, roleMiddleware('Admin'), signupTutor);

module.exports = userRoute;