const userModel = require('../model/userModel');

const roleBasedMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.user.id;
    const user = await userModel.findOne(userId);
        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }
    const userRole = user.role;

    // Check if the user's role is in the allowed roles
    if (allowedRoles.includes(userRole)) {
      next(); 
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
    }
  };
}

module.exports = roleBasedMiddleware;