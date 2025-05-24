const sessionModel = require('../model/sessionModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const activityMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
    try{
        const session = await sessionModel.findOne({user: req.user.id});
        const now = new Date();
        session.last_activity = now;
        await session.save();
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid access token" });
    }
}

module.exports = activityMiddleware; 