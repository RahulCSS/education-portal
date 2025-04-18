const e = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String , unique: true, sparse: true },
    address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
        zip_code: { type: String, default: "" }
    },
    user_id: { type: String, unique: true, sparse: true },
    role: { type: String, default: "user", enum:["Student","Tutor","Admin"]},
    enrolled_courses: { type: Array, default: [] },
    created_courses: { type: Array, default: [] },
    profile_image: { type: String },
    grade: { type: Number, default: 0 },
    bio: { type: String , default: "" },
    token: { 
        token: { type: String, default: "" },
        created_at: { type: Date, default: Date.now, expires: 3600 }
     },
}, {timestamps: true, minimize: false});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
