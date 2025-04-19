const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.put('/update/:id', authMiddleware, updateUser);


module.exports = userRoute;