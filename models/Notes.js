const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    tags: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timeStamps: {
        createdAt: {
            type: String,
            default: Date()
        },
        updatedAt: {
            type: String,
            default: Date()
        }
    }
});

const Notes = mongoose.model("Notes", NoteSchema);
module.exports = Notes;

