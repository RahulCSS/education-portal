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

// Register a new user
const registerUser = async (req,res) => {
    const {first_name, last_name, email, password } = req.body;
    try{
        // 1. Check if all required fields are provided
        if(!first_name || !last_name || !email || !password){
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // 2. Validating fields
        if(!isValidEmail(email)){
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if(!isValidPassword(password)){
            return res.status(400).json({ message: "Password must be at least 8 characters long, must contain at least one uppercase letter, one lowercase letter, and one number" });
        }

        // 3. If all fields valid , Check if email already exists
        const userExists = await userModel.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        // 4. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create a new user
        const newUser = new userModel({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: "Student"
        });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    }catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Login a user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try{
        // 1. Check if all required fields are provided
        if(!email || !password){
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // 2. Check if user exists
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }

        // 3. Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 4. Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token.token = token;
        await user.save();
        const { password:_,token:__, updatedAt:___,__v:____, ...userWithoutPassword } = user._doc;
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });
        return res.status(200).json({ message: "User loggedin successfully" , userData: userWithoutPassword });
    }catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    registerUser, loginUser
};