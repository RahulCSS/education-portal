const courseModel = require("../model/courseModel");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

// Validators
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

// Hashing password
const hashValue = async (value) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
};

// Get all students
const getStudents = async (req,res) => {
    const {
        page = 1,
        limit = 5,
        sortBy = 'fullname',
        sortOrder = 'asc',
        search = ''
      } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const total = await userModel.countDocuments({role: 'Student'});
    const totalPages = Math.ceil(total / limitNum);

    try{
        const students = await userModel
            .find({role: 'Student'})
            .select("fullname email phone createdAt address.state")
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        return res.status(200).json({ success: true, data: students, totalpages:totalPages });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching students" });
    }
}

// Get all Tutors
const getTutors = async (req,res) => {
    const {
        page = 1,
        limit = 5,
        sortBy = 'fullname',
        sortOrder = 'asc',
        search = ''
      } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const total = await userModel.countDocuments({role: 'Tutor'});
    const totalPages = Math.ceil(total / limitNum);

    try{
        const tutors = await userModel
            .find({role: 'Tutor'})
            .select("fullname email phone createdAt address.state")
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        return res.status(200).json({ success: true, data: tutors, totalpages:totalPages });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching students" });
    }
}

// Get all Tutors
const getCourses = async (req,res) => {
    const {
        page = 1,
        limit = 5,
        sortBy = 'fullname',
        sortOrder = 'asc',
        search = ''
      } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const total = await courseModel.countDocuments();
    const totalPages = Math.ceil(total / limitNum);

    try{
        const courses = await courseModel
            .find()
            .select("title description price tutor createdAt")
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        return res.status(200).json({ success: true, data: courses, totalpages:totalPages });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching students" });
    }
}

// Register a new user
const signupTutor = async (req,res) => {
    const {fullname, email, password} = req.body;
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
            role: 'Tutor',
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully" });
    }catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getStudents, getTutors, getCourses, signupTutor
};