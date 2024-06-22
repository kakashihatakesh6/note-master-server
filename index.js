const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { axios } = require('axios');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require('dotenv').config();


const uri = 'mongodb+srv://sages:sages@sages.p1zye6m.mongodb.net/news'
//
mongoose.connect(uri).then(() => {
    console.log("MongoDB connected successfully!")
}).catch((error) => {
    console.log("Error connecting to mongoose!", error)
});

app.get('/', (req, res) => {
    res.json({ message: 'Server is running fine!' });
})

app.get('/getdata', async (req, res) => {
    try {
        let response = await axios.get(`https://newsapi.org/v2/everything?q=cricket&apiKey=1bb53ca7aeed4092a31d64da60e357e8`);
        let newsData = response.data;
        // console.log(newsData);
        res.status(200).json({ message: 'success', newsData: newsData })
    } catch (error) {
        res.status(500).json({ message: "internal server errror" })
    }

})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})