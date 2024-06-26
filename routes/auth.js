const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateReques');
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// ROUTE 1 : Create a user using: POST "/api/auth/createuser". Dosen't require Auth
router.post('/createuser', validateRequest, async (req, res) => {
    const { name, email, password, dob, city, zipCode } = req.body;
    console.log("form data =>", name, email, password, dob, city, zipCode);
    try {
        const user = await User.findOne({ email });
        // User Exist 
        if (user) {
            return res.status(400).json({ success: false, message: 'User Already Exist!' });
        }

        // Generating hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Creating a new User
        const newUser = new User({
            name, email,
            password: hashedPassword,
            dob, city, zipCode
        });

        await newUser.save();
        console.log("newUser =>", newUser)

        // Generation a token
        const authtoken = JWT.sign({ name, email }, process.env.JWT_SECRET);
        // const authtoken2 = JWT.verify(authtoken, process.env.JWT_SECRET)

        return res.status(200).send({ success: true, authtoken: authtoken });

    } catch (error) {
        return res.status({ success: false, message: "Internal server error!" });
    }

})

// ROUTE 2: Autenticate a USER using POST : "/api/auth/login"
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' })
        }
        console.log("user =>",user)
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(404).json({ success: false, message: 'Please Enter the right password' })
        }
        const jwtName = user.name;
        const authtoken = JWT.sign({jwtName, email}, process.env.JWT_SECRET)
        return res.status(200).json({ success: true, authtoken: authtoken })
    } catch (error) {
        return res.status(404).json({ success: false, message: 'Internal server error!' })
    }
})


// ROUTE 3: Get logged in USER details using POST : "/api/auth/getuser" Login 
router.post('/getuser', async () => {

})

module.exports = router;