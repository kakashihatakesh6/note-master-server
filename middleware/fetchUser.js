const JWT = require('jsonwebtoken');
const User = require('../models/User');
const fetchUser = async (req, res, next) => {
    try {
        const {authtoken} = req.body;
        if (!authtoken) {
            return res.status(200).json({success: false, message: "internal server error token!"})
        }
        const {email} = JWT.verify(authtoken, process.env.JWT_SECRET);
        const user = await User.findOne({email});
        console.log("fetchuser =>", user)
        if (!user) {
            return res.status(200).json({success: false, message: "internal server error!"})
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(200).json({success: false, message: "internal server error!"})
    }
}

module.exports = fetchUser;