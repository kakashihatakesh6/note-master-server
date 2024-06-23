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
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@sages.p1zye6m.mongodb.net/news-point`).then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => {
    console.log("Error Connecting to Mongo", error);
});

app.get('/', (req, res) => {
    res.json({"message": "News-Point server running fine!"})
});

app.listen(port, () => {
    console.log("Server running on port http://localhost:" + port);
});

// getdata
app.get('/getdata', async (req, res) => {
    try {
        let { q, page } = req.query;
        // console.log("value q =>", q)
        let response = await axios.get(`https://newsapi.org/v2/top-headlines?q=${q || 'india'}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${6}`);
        let newsData = response.data;
        // console.log(newsData);
        res.status(200).json({ message: 'success', newsData: newsData })
    } catch (error) {
        res.status(500).json({ message: "internal server errror" })
    }

});


// module.exports = app;