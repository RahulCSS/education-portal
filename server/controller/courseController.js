const courseModel = require("../model/courseModel");

const addCourse = async (req,res) => {
    const {title,description,price,tutor} = req.body;
    try{
        // 1. Check if all required fields are provided
        if(!title || !description || !price || !tutor){
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        // 2. Create new course
        const newCourse = new courseModel({
            title,
            description,
            price,
            tutor,
        });
        await newCourse.save();
        return res.status(201).json({ success: true, message: "Course added successfully" });
    }catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    addCourse
}