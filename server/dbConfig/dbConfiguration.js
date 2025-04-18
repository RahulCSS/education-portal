const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Environment variables
dotenv.config();
const mongoURL = process.env.MONGO_URL;

// Database connection
const connectDB = async () =>{
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // To terminate the process( Node.js server) if DB connection fails
    }
}

module.exports = connectDB;