const express =  require('express');
const cors = require ('cors');
const app = express();
const userRoute = require('./route/userRoute');
const adminRoute = require('./route/adminRoute');

// Imports
const connectDB = require('./dbConfig/dbConfiguration');


// Environment variables
const dotenv = require ('dotenv');
dotenv.config();
const port = process.env.PORT;


// Database connection
connectDB();


// Server 
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});


// API routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);