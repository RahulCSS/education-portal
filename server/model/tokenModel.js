const mongoose  = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    refreshToken: {type: String,required: true},
    created_at: { type: Date, default: Date.now, expires: 14400 }
})

const tokenModel = mongoose.model("Token", tokenSchema);
module.exports = tokenModel;