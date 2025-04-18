const express = require('express');
const { registerUser } = require('../controller/adminController');
const adminRoute = express.Router();

adminRoute.post('/register', registerUser);

module.exports = adminRoute;