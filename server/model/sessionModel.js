const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    start_time: { type: Date, default: Date.now, required: true },
    end_time:{ type: Date},
    total_time: { type: Number},
    last_activity: { type: Date, default: Date.now, required: true  },
})

const sessionModel = mongoose.model("Session",  sessionSchema);
module.exports = sessionModel;