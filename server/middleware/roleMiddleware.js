const userModel = require('../model/userModel');

const roleBasedMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    try{
      // 1. Check if userId is present in the request
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found in request.' });
      }

      // 2. Check if the user exists in the database
      const user = await userModel.findById(userId);
      if(!user){
          return res.status(400).json({ message: "User does not exist" });
      }
      
      // 3. Check if the user's role is in the allowed roles
      const userRole = user.role;
      if (allowedRoles.includes(userRole)) {
        next(); 
      } else {
        res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
      }
    }catch (error) {
      console.error('Role-based middleware error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  };
}

module.exports = roleBasedMiddleware;