const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = {
    registerUser,
};