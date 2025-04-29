const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');

const aboutusUpSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    backgroundImageUrl: String,

}, { timestamps: true });

const aboutusUpValidate = (aboutusUp) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        backgroundImageUrl: Joi.string(),

    })
    return schema.validate(aboutusUp);
};

const AboutusUp = mongoose.model("AboutusUp", aboutusUpSchema);

//==========================================================================================

const introductionSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    descriptionAze: String,
    descriptionEng: String,
    imageUrl: String,
    titleFirstAze: String,
    titleFirstEng: String,
    subdescriptionFirstAze: String,
    subdescriptionFirstEng: String,
    titleSecondAze: String,
    titleSecondEng: String,
    subdescriptionSecondAze: String,
    subdescriptionSecondEng: String,

}, { timestamps: true });

const introductionValidate = (introduction) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),
        imageUrl: Joi.string(),
        titleFirstAze: Joi.string(),
        titleFirstEng: Joi.string(),
        subdescriptionFirstAze: Joi.string(),
        subdescriptionFirstEng: Joi.string(),
        titleSecondAze: Joi.string(),
        titleSecondEng: Joi.string(),
        subdescriptionSecondAze: Joi.string(),
        subdescriptionSecondEng: Joi.string(),

    })
    return schema.validate(introduction);
};

const Introduction = mongoose.model("Introduction", introductionSchema);

//==========================================================================================

const teamSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    teamId: Number,
    teamImage: String,
    fullname: String,
    roleAze: String,
    roleEng: String,
    socialMedia: {
        twitterBtnUrl: String,
        facebookBtnUrl: String,
        tikTokBtnUrl: String,
        instagramBtnUrl: String,
        whatsappBtnUrl: String
    },

}, { timestamps: true });

const teamValidate = (team) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        teamId: Joi.number(),
        teamImage: Joi.string(),
        fullname: Joi.string(),
        roleAze: Joi.string(),
        roleEng: Joi.string(),
        socialMedia: Joi.object({
            twitterBtnUrl: Joi.string().uri(),
            facebookBtnUrl: Joi.string().uri(),
            tikTokBtnUrl: Joi.string().uri(),
            instagramBtnUrl: Joi.string().uri(),
            whatsappBtnUrl: Joi.string().uri(),
        }),
        
    })
    return schema.validate(team);
};

const Team = mongoose.model("Team", teamSchema);

//==========================================================================================

const customerReviewsSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    commentId: Number,
    reyting: Number,
    comment: String,
    fullname: String,
    avatarUrl: String,

}, { timestamps: true });

const customerReviewsValidate = (customerReviews) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        commentId: Joi.number(),
        reyting: Joi.number().min(1).max(5),
        comment: Joi.string(),
        fullname: Joi.string(),
        avatarUrl: Joi.string(),

    })
    return schema.validate(customerReviews);
};

const CustomerReviews = mongoose.model("CustomerReviews", customerReviewsSchema);

//==========================================================================================

const counterSchema = Schema({
    headingAze: String,
    headingEng: String,
    value: { type: Number, default: 0 },

}, { timestamps: true });

const counterValidate = (counter) => {
    const schema = new Joi.object({
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        value: Joi.number().integer().min(0),

    })
    return schema.validate(counter);
};

const Counter = mongoose.model("Counter", counterSchema);

//==========================================================================================

module.exports = {
    AboutusUp, aboutusUpValidate,
    Introduction, introductionValidate,
    Team, teamValidate,
    CustomerReviews, customerReviewsValidate,
    Counter, counterValidate,
};
