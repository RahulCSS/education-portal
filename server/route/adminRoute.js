const express = require('express');
const { registerUser, updateUser } = require('../controller/adminController');
const adminRoute = express.Router();

adminRoute.post('/register', registerUser);
adminRoute.put('/update/:id', updateUser);

module.exports = adminRoute;