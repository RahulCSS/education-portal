const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: {type: String},
    price: { type: Number, default: 0 },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    enrolled_students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const courseModel = mongoose.model("Course", courseSchema);
module.exports = courseModel;