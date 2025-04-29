const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');

const faqUpSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    backgroundImageUrl: String,

}, { timestamps: true });

const faqUpValidate = (faqUp) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        backgroundImageUrl: Joi.string(),

    })
    return schema.validate(faqUp);
};

const FaqUp = mongoose.model("FaqUp", faqUpSchema);

//==========================================================================================

const faqDownSchema = Schema({
    questionId: Number,
    titleAze: String,
    titleEng: String,
    descriptionAze: String,
    descriptionEng: String,

}, { timestamps: true });

const faqDownValidate = (faqDown) => {
    const schema = new Joi.object({
        questionId: Joi.number(),
        titleAze: Joi.string(),
        titleEng: Joi.string(),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),

    })
    return schema.validate(faqDown);
};

const FaqDown = mongoose.model("FaqDown", faqDownSchema);

//==========================================================================================

module.exports = {
    FaqUp, faqUpValidate,
    FaqDown, faqDownValidate
};