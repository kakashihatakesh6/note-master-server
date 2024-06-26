const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./db');

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();


// MongoDB Connection
connectDB();


app.get('/', (req, res) => {
    res.json({ "message": "News-Master server running fine!" })
});

app.get('/hello', (req, res) => {
    res.json({message: "Hello from nikhil!"})
})

app.listen(port, () => {
    console.log("Server running on port http://localhost:" + port);
});

// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// module.exports = app;