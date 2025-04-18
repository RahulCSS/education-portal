const express = require('express');
const { registerUser } = require('../controller/userController');
const userRoute = express.Router();

userRoute.post('/register', registerUser);

module.exports = userRoute;