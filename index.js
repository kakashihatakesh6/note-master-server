const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

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
    console.log("Server running on port 3000");
});

// getdata
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



const Habit = require('./models/habit');
const { default: axios } = require('axios');
// Endpoints to create a habit in a backend
app.post("/habits", async (req, res) => {
    try {
        const {title, color, repeatMode, reminder} = req.body;
        const newHabit = new Habit({
            title,
            color,
            repeatMode,
            reminder
        })
        console.log(newHabit)

        const savedHabit = await newHabit.save();
        res.status(200).json(savedHabit);

    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});


app.get("/habitslist", async (req, res) => {
    try {
        const allHabits = await Habit.find({});

        res.status(200).json(allHabits);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.put("/habits/:habitId/completed", async (req, res) => {
    const habitId = req.params.habitId;
    const updatedCompletion = req.body.completed; // The updated completion object
    
    try {
        const updatedHabit = await Habit.findByIdAndUpdate(
            habitId,
            { completed: updatedCompletion },
            { new: true }
        );
        console.log("IDDD =>", habitId, updatedHabit)

        if (!updatedHabit) {
            return res.status(404).json({error: "Habit not found"})
        }

        res.status(200).json(updatedHabit);

    } catch (error) {
        console.log("Error", error);
        res.status(500).json({error: error.message})
    }
});

app.delete("/habits/:habitId", async (req, res) => {
    try {
        const {habitId} = req.params;

        await Habit.findByIdAndDelete(habitId);
        res.status(200).json({message: "Habit deleted successfully!"})
    } catch (error) {
        res.status(500).json({error: "Unable to delete the habit"})
    }
});

// module.exports = app;