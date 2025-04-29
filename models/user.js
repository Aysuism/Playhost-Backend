const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');
var jwt = require('jsonwebtoken');

const userSchema = Schema({
    name: String,
    surname: String,
    username: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });

const userValidate = (user) => {
    const schema = new Joi.object({
        name: Joi.string(),
        surname: Joi.string(),
        username: Joi.string(),
        email: Joi.string().min(10).max(50),
        password: Joi.string().min(8).max(50),
        phone: Joi.string().min(8).max(15),
        role: Joi.string(),
        active: Joi.boolean(),

    })
    return schema.validate(user);
};

const loginValidate = (user) => {
    const schema = new Joi.object({
        email: Joi.string().min(10).max(50),
        password: Joi.string().min(8).max(50),

    })
    return schema.validate(user);
};

userSchema.methods.createAuthToken = function () {
    const decodedToken = jwt.sign({ name: this.name, role: this.role }, "jwtPrivateKey");
    return decodedToken;
};

const User = mongoose.model("User", userSchema);

module.exports = {
    User, userValidate,
    loginValidate
};