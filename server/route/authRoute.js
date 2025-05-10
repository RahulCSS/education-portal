const express = require('express');
const { refreshToken } = require('../controller/authController');
const authRoute = express.Router();

authRoute.get('/refresh', refreshToken);

module.exports = authRoute;