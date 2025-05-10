const userModel = require("../model/userModel");

const getAllStudents = async (req,res) => {
    try{
        const students = await userModel.find({role: 'Student'}).select("fullname email phone createdAt address.state")
        return res.status(200).json({ success: true, data: students });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching students" });
    }
}

const getAllTutors = async (req,res) => {
    try{
        const tutors = await userModel.find({role: 'Tutor'}).select("fullname email phone createdAt")
        return res.status(200).json({ success: true, data: tutors });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching students" });
    }
}

module.exports = {
    getAllStudents, getAllTutors
};