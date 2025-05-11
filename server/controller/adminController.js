const userModel = require("../model/userModel");

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

const getTutors = async (req,res) => {
    try{
        const tutors = await userModel.find({role: 'Tutor'}).select("fullname email phone createdAt")
        return res.status(200).json({ success: true, data: tutors });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching students" });
    }
}

module.exports = {
    getStudents, getTutors
};