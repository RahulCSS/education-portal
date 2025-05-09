const express = require('express');
const { signupUser,registerUser, loginUser, updateUser, logoutUser, checkEmail } = require('../controller/userController');
const { getAllStudents, getAllTutors } = require('../controller/adminController');
const authMiddleware  = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const userRoute = express.Router();

userRoute.post('/signup', signupUser);
userRoute.post('/register',authMiddleware, roleMiddleware('Admin'), registerUser);
userRoute.post('/login', loginUser);
userRoute.put('/update/:id', authMiddleware, updateUser);
userRoute.post('/logout/:id', authMiddleware, logoutUser);
userRoute.post('/check-email/:email',checkEmail);
userRoute.get('/get-all-students',getAllStudents);
userRoute.get('/get-all-tutors',getAllTutors);

module.exports = userRoute;