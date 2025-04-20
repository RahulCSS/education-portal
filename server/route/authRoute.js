const express = require('express');
const { refreshToken } = require('../controller/authController');
const authRoute = express.Router();

authRoute.post('/refresh', refreshToken);

module.exports = authRoute;