const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    dob: Joi.date().required(),
    city: Joi.string().required(),
    zipCode: Joi.number().required(),
})

const validateRequest = async (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    console.log("validation successfull!")
    next();
}

module.exports = validateRequest;