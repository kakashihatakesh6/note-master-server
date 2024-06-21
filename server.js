const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const uri = 'mongodb+srv://sages:sages@sages.p1zye6m.mongodb.net/news'
//
mongoose.connect(uri).then(() => {
    console.log("MongoDB connected successfully!")
}).catch((error) => {
    console.log("Error connecting to mongoose!", error)
})

app.get('/', (req, res) => {
    res.json({message: 'Server is running fine!'});
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})