const userModel = require("../model/userModel");
const tokenModel = require("../model/tokenModel")
const sessionModel = require("../model/sessionModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

// Validators
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};
const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
};

// Token generators
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '15m' });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id ,session_id: user.session_id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '6h' });
};

// Verify token
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN);
};

// Hashing password
const hashValue = async (value) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
};
const compareHashValue = async (value, hashedValue) => {
    return await bcrypt.compare(value, hashedValue);
}

// Register a new user
const signupUser = async (req,res) => {
    const {fullname, email, password } = req.body;
    try{
        // 1. Check if all required fields are provided
        if(!fullname || !email || !password){
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        // 2. Validating fields
        if(!isValidEmail(email)){
            return res.status(422).json({ success: false, message: "Please enter a valid email" });
        }
        if(!isValidPassword(password)){
            return res.status(422).json({ success: false, message: "Password must be at least 8 characters long, must contain at least one uppercase letter, one lowercase letter, and one number" });
        }

        // 3. If all fields valid , Check if email already exists
        const userExists = await userModel.findOne({ email });
        if(userExists){
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // 4. Hash the password
        const hashedPassword = await hashValue(password);

        // 5. Create a new user
        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword,
            role: "Student"
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully" });
    }catch (error) {
        return res.status(500).json({ message: "Error registering user, Internal sever error.", error});
    }
};

// Login a user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try{
        // 1. Check if all required fields are provided
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        // 2. Check if user exists
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // 3. Check if password is correct
        const isMatch = compareHashValue(password, user.password);
        if(!isMatch){
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 4. New Sesion is created
        const session = new sessionModel({
            user: user._id,
            session:{
                start_time: Date.now(),
            },
        });
        await session.save();

        // 5. Store session_id in user
        user.session_id= session._id;
        await user.save();

        // 6. Generate a token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // 7. Hash and save the refresh token in the database
        const hashedRefreshToken = await hashValue(refreshToken);

        // 8. Token is saved
        const token = new tokenModel({
            user: user._id,
            refreshToken: hashedRefreshToken
        });
        await token.save();
        
        // 9. Set the access & refresh token in the cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            path: "/",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            path: "/auth/refresh",
            maxAge: 6 * 60 * 60 * 1000
        });

        const { password:_, token:__, updatedAt:___, __v:____, ...userWithoutPassword } = user._doc;
        return res.status(200).json({ success: true, message: "User loggedin successfully" , userData: userWithoutPassword });
    }catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update user profile
const updateUser = async (req,res) => {
    const userId = req.params.id;
    const { email, phone, ...updatevalues } = req.body;
    try{
        // 1. Validating fields
        if(email &&!isValidEmail(email)){
            return res.status(422).json({ success: false, message: "Please enter a valid email" });
        }
        if(phone && !isValidPhone(phone)){
            return res.status(422).json({ success: false, message: "Please enter a valid phone number" });
        }

        // 2. Check if user exists
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // 3. Update user
        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            req.body,
            { new: true, runValidators: true }
        );
        if(!updateUser){
            return res.status(500).json({ success: false, message: "Error updating user" });
        }
        return res.status(200).json({ success: true, message: "User updated successfully" });
    }catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Logout User
const logoutUser = async (req,res) => {
    const userId = req.user.id;
    try{
        // 1. Check if the user exists
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
        
        // 2. Check for active session
        if(!user.session_id){
            return res.status(404).json({ success: false, message: "No active session found" });
        }

        // 3. Clear Token
        const deleteToken = await tokenModel.findOneAndDelete({ user: userId });
        if (!deleteToken) {
            return res.status(404).json({ success: false, message: "No active session found" });
          }

        // 3. Note session end time
        const session = await sessionModel.findById(user.session_id);
        if (session) {
            session.end_time = Date.now();
            const endtime = session.end_time;
            const starttime = session.start_time;
            const totaltime = endtime - starttime; 
            session.total_time = Math.floor(totaltime);
            await session.save();
        }

        // 4. Clear session id
        user.session_id = null;
        await user.save();

        // 5. Clear the cookies
        res.clearCookie("access_token");
        res.clearCookie("refresh_token", { path: "/auth/refresh" });
        
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Error logging out user" });
    }

}

// Check Email
const checkEmail = async (req,res) => {
    const email = req.params.email;
    try{
        const userEmail = await userModel.findOne({email});
        if(userEmail){
            return res.status(200).json({success: true, message:"Email Id exists"})
        }
        if(!userEmail){
            return res.status(200).json({ success: false, message: "Email ID does not exist" });
        }
    }catch(error){
        return res.status(500).json({ message: "Error checking emailID" });
    }
};

module.exports = {
    signupUser, loginUser, updateUser, logoutUser, checkEmail
};