const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    id: { type: String, required: true , unique: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    enrolled_students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
courseSchema.index({ id: 1, tutor: 1 }, { unique: true });

const courseModel = mongoose.model("Course", courseSchema);
module.exports = courseModel;