const express = require('express');
const { refreshToken } = require('../controller/authController');
const authRoute = express.Router();

authRoute.post('/refresh-token', refreshToken);

module.exports = authRoute;