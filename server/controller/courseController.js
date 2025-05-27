const courseModel = require("../model/courseModel");

const addCourse = async (req,res) => {
    const {title,description,price,tutor,imageUrl} = req.body;
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
            imageUrl,
            });
        await newCourse.save();
        return res.status(201).json({ success: true, message: "Course added successfully" });
    }catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Get Courses by Tutor Id
const getCoursebyTutorId = async (req,res) => {
    const {
        page = 1,
        limit = 5,
        sortBy = 'fullname',
        sortOrder = 'asc',
        userId,
      } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const total = await courseModel.countDocuments();
    const totalPages = Math.ceil(total / limitNum);
    try{
        const courses = await courseModel
            .find({tutor: userId})
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

// Get Courses by Id
const getCoursebyId = async (req,res) => {
    const { id } = req.params;
    try{
        const courses = await courseModel.findById(id);
        return res.status(200).json({ success: true, data: courses });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching students" });
    }
}

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletion = await courseModel.findByIdAndDelete(courseId);
    return res.status(200).json({ success: true, message: "Course deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
};

module.exports = {
    addCourse, getCoursebyTutorId, getCoursebyId, deleteCourse
}