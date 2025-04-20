const mongoose = require("mongoose");


const submissionSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentUrl: String, 
    answers: Array,     
    grade: String,
    feedback: String,
    submittedAt: { type: Date, default: Date.now }
  }, { timestamps: true });
