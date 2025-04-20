const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    video_url: {type: String, default: ""},
    watch_minutes: { type: Number, default: 0 },
    title: {type: String, default: ""}
}, { _id : false });

const pdfSchema = new mongoose.Schema({
    pdf_url: {type: String, default: ""},
    read_minutes: { type: Number, default: 0 },
    title: {type: String, default: ""}
}, { _id : false });

const flashCardSchema = new mongoose.Schema({
    flashCard_url: {type: String, default: ""},
    total_minutes: { type: Number, default: 0 },
    title: {type: String, default: ""}
}, { _id : false });

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    materials: [{
        type: { type: String, enum: ['video', 'pdf','flashCards'] },
        video: { videoSchema },
        pdf: { pdfSchema },
        flashCards: { flashCardSchema }
    }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    duration: { type: Number, default: 0 },
}, {timestamps: true});

const moduleModel = mongoose.model("Module", moduleSchema);
module.exports = moduleModel;