const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');

const contactUpSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    backgroundImageUrl: String,

}, { timestamps: true });

const contactUpValidate = (contactUp) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        backgroundImageUrl: Joi.string(),

    })
    return schema.validate(contactUp);
};

const ContactUp = mongoose.model("ContactUp", contactUpSchema);

//==========================================================================================

const contactDownSchema = Schema({
    titleAze: String,
    titleEng: String,
    name: String,
    email: String,
    phone: String,
    message: String,
    btnUrl: String,

}, { timestamps: true });

const contactDownValidate = (contactDown) => {
    const schema = new Joi.object({
        titleAze: Joi.string(),
        titleEng: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string().max(15),
        message: Joi.string(),
        btnUrl: Joi.string(),

    })
    return schema.validate(contactDown);
};

const ContactDown = mongoose.model("ContactDown", contactDownSchema);

//==========================================================================================

module.exports = {
    ContactUp, contactUpValidate,
    ContactDown, contactDownValidate
};