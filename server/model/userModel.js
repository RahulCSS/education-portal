const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    zip_code: { type: String, default: "" }
}, { _id : false });

const profileSchema = new mongoose.Schema({
    profile_image: { type: String, default: "" },
    bio: { type: String, default: "" },
    grade: { type: Number, default: 0 }
}, { _id : false });

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String , unique: true, sparse: true },
    address: { addressSchema },
    role: { type: String, default: "Student" , enum: ["Admin", "Student", "Tutor"] },
    enrolled_courses: { type: Array, default: [] },
    created_courses: { type: Array, default: [] },
    profile: { profileSchema },
    session_id: {type: mongoose.Schema.Types.ObjectId,ref:'Session'},
}, {timestamps: true, minimize: false});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
