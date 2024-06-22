const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { default: axios } = require('axios');

//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();


//
mongoose.connect("mongodb+srv://sages:sages@sages.p1zye6m.mongodb.net/habit-app").then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => {
    console.log("Error Connecting to MOnoOG", error);
});


app.get('/', (req, res) => {
    res.json({"message": "Server is running fine!"})
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});

// getdata
app.get('/getdata', async (req, res) => {
    try {
        let { q, page } = req.query;
        console.log("value q =>", q)
        let response = await axios.get(`https://newsapi.org/v2/top-headlines?q=${q}&apiKey=ee81ff9f416a4def8e6b956b077bb745&page=${page}&pageSize=${6}`);
        let newsData = response.data;
        // console.log(newsData);
        res.status(200).json({ message: 'success', newsData: newsData })
    } catch (error) {
        res.status(500).json({ message: "internal server errror" })
    }

});


// module.exports = app;