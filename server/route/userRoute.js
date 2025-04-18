const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controller/userController');
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.put('/update/:id', updateUser);


module.exports = userRoute;