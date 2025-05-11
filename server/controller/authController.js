const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../model/userModel');
const tokenModel = require('../model/tokenModel');

// Verify token
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN);
};

// Validate hashed refresh token
const compareRefreshToken = async (refreshToken, hashedRefreshToken) => {
    return await bcrypt.compare(refreshToken, hashedRefreshToken);
};

// Access token generator
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '15m' });
};

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
    }
    try {
        const payload = verifyToken(refreshToken);
        const user = await userModel.findById(payload.id);
        
        // 1. Check if user exists
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }
        
        // 2. Check if session is still live
        if(!user.session_id){
            return res.status(403).json({message: "Session expired"})
        }
        
        // 3. Check if refresh token exists
        const token = await tokenModel.findOne({user:user._id})
        if(!token){
            return res.status(401).json({ message: "No token found" });
        }
        
        // 4. Check if refresh token is valid
        const isMatch = await compareRefreshToken(refreshToken, token.refreshToken);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid refresh token" });
        };
        
        // 4. Generate new access token
        const  newAccessToken = generateAccessToken(user);
        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            path: "/",
            maxAge: 15 * 60 * 1000
        });
        return res.status(200).json({ message: 'Access token refreshed' });
    } catch (error) {
        return res.status(403).json({ message: "Refresh token expired or invalid" });
    }
};

module.exports = {
    refreshToken
};