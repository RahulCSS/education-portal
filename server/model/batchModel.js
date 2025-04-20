const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    batch_id: { type: String, required: true , unique: true },
    course_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now },
}, { timestamps: true });


const batchModel = mongoose.model("Batch", batchSchema);
module.exports = batchModel;