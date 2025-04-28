const userModel = require("../model/userModel");
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
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '6h' });
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

// Register a new user
const registerUser = async (req,res) => {
    const {fullname, email, password, role} = req.body;
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

        // 5. Hash the password
        const hashedPassword = await hashValue(password);

        // 6. Create a new user
        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully" });
    }catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
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

        // 4. Generate a token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // 5. Hash and save the refresh token in the database
        const hashedRefreshToken = await hashValue(refreshToken);
        user.token= {
            refresh_token: hashedRefreshToken,
            createdAt: Date.now()
        }
        await user.save();
        const { password:_, token:__, updatedAt:___, __v:____, ...userWithoutPassword } = user._doc;

        // 6. Set the access & refresh token in the cookie
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
            path: "/",
            maxAge: 6 * 60 * 60 * 1000
        });
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

const logoutUser = async (req,res) => {
    const userId = req.user.id;
    try{
        // 1. Check if the user exists
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // 3. Delete the refresh token from the database
        user.token = {};
        await user.save();

        // 4. Clear the cookies
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    }catch(error){
        console.error("Error logging out user:", error);
        return res.status(500).json({ message: "Error logging out user" });
    }

}

module.exports = {
    signupUser, registerUser, loginUser, updateUser,logoutUser
};