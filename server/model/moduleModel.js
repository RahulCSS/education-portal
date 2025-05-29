const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image_url: {type: String},
    video_url: {type: String, default: ""},
    watch_minutes: { type: Number, default: 0 },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    duration: { type: Number, default: 0 },
}, {timestamps: true});

const moduleModel = mongoose.model("Module", moduleSchema);
module.exports = moduleModel;