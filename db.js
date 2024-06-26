const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@sages.p1zye6m.mongodb.net/note-master`;

async function connectDB() {
    await mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully!");
} 

connectDB().catch(error => console.log(error));

module.exports = connectDB;