const express = require('express');
const { registerUser } = require('../controller/adminController');
const { updateUser } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminRoute = express.Router();

// Middleware
adminRoute.use(authMiddleware);
adminRoute.use(roleMiddleware('admin'));

// Routes
adminRoute.post('/register', registerUser);
adminRoute.put('/update/:id', updateUser);

module.exports = adminRoute;