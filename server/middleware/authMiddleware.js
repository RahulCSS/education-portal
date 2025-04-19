const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: "No access token" });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid access token" });
    }
};

module.exports = authMiddleware;
