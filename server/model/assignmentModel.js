const mongoose = require("mongoose");

const assignementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    type: { type: String, enum: ['assignment', 'quiz','flashCards'], default: 'assignment' },
    due_date: { type: Date, default: Date.now },
    total_marks: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    materials: [{
        type: { type: String, enum: ['assignment', 'quiz','matchPairs'] },
        quiz: {
            quiz_url: {type: String, default: ""},
            total_minutes: {type: Number, default: 0},
            total_questions: {type: Number, default: 0},
            total_marks: {type: Number, default: 0},
            title: {type: String, default: ""}
        },
        matchPairs: {
            matchPairs_url: {type: String, default: ""},
            total_minutes: {type: Number, default: 0},
            total_pairs: {type: Number, default: 0},
            total_marks: {type: Number, default: 0},
            title: {type: String, default: ""}
        },
        assignment: {
            title: {type: String, default: ""},
            description: {type: String, default: ""},
            total_marks: {type: Number, default: 0},
        }
    }],
}, { timestamps: true });

const assignmentModel = mongoose.model("Assignment", assignementSchema);
module.exports = assignmentModel;