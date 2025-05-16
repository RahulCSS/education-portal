const cloudinary = require("../utils/cloudinary");

const uploadVideo = async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path,
            { resource_type: "video", folder: "Elevate_lms" }
        );
        return res.status(200).json({ success: true, message: "Video Uploaded", data: result});
    }
    catch(error){
        return res.status(500).json({success: false, message: `Error uploading video - ${error}`});
    }
};

module.exports = {
    uploadVideo
}
