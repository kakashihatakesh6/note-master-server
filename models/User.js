const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date()
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;