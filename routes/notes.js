const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const router = express.Router();
const JWT = require('jsonwebtoken');
const User = require('../models/User');


// ROUTE 1 : Create a note
router.post('/createnote', fetchUser, async (req, res) => {
    const { title, description, tags } = req.body;
    try {
        const user = req.user;
        const userID = user._id;
        console.log(user)
        if (!user) {
            return res.status(500).json({ success: false, message: 'INternal server errror' })
        }
        const newNote = new Notes({
            title,
            description,
            tags,
            user: userID
        });
        console.log("new-note =>", newNote)
        let note = await newNote.save();
        return res.status(200).json({ success: true, message: 'New note created successfully!', note: note })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'INternal server errror' })
    }



});

// ROUTE 1 : get all notes

router.get('/getnotes', async (req, res) => {
    try {
        const { authtoken } = req.query;
        if (!authtoken) {
            return res.status(500).json({ success: false, message: 'INternal server errror' })
        }
        const { email } = JWT.verify(authtoken, process.env.JWT_SECRET);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ success: false, message: 'INternal server errror' })
        }
        const notes = await Notes.find({user: user._id});
        return res.status(200).json({ success: true, notes: notes })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'INternal server errror' })
    }
});

// ROUTE 4 : Update a note

router.put('/updatenote/:id', async (req, res) => {
    try {
        const {newData} = req.body;
        const { id } = req.params;
        console.log("id =>", id, newData)
        if (!id) {
            return res.status(500).json({ success: false, message: 'INternal server errror' })
        }
        const updatedNote = await Notes.findOneAndUpdate({_id: id}, {$set: newData}, {new: true});
        console.log("updated note =>", updatedNote);
        if (!updatedNote) {
            return res.status(500).json({ success: false, message: 'INternal server errror' })
        }
        return res.status(200).json({ success: true, message: "Note successfully updated!", note: updatedNote })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'INternal server errror' })
    }
});


// ROUTE 4 : Delete a note

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id =>", id)
        if (!id) {
            return res.status(500).json({ success: false, message: 'INternal server errror' })
        }
        const deletednote = await Notes.findOneAndDelete({ _id: id });
        if (!deletednote) {
            return res.status(500).json({ success: false, message: 'INternal server errror' })
        }
        return res.status(200).json({ success: true, message: "Note successfully deleted!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'INternal server errror' })
    }
});




module.exports = router;