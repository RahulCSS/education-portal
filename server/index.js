const express =  require('express');
const cors = require ('cors');
const app = express();

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

app.get('/',(req,res) => {
    res.send('Hellow World');
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});