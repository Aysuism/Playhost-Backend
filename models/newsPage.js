const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');

const blogPageSchema = Schema({
    blogId: Number,
    imageUrl: String,
    titleAze: String,
    titleEng: String,
    descriptionAze: String,
    descriptionEng: String,
    date: {
        type: Date,
        default: Date.now
    },

}, { timestamps: true });

const blogPageValidate = (blogPage) => {
    const schema = new Joi.object({
        blogId: Joi.number(),
        imageUrl: Joi.string(),
        titleAze: Joi.string(),
        titleEng: Joi.string(),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),
        date: Joi.date(),

    })
    return schema.validate(blogPage);
};

const BlogPage = mongoose.model("BlogPage", blogPageSchema);

//==========================================================================================

const newsUpSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    backgroundImageUrl: String,

}, { timestamps: true });

const newsUpValidate = (newsUp) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        backgroundImageUrl: Joi.string(),

    })
    return schema.validate(newsUp);
};

const NewsUp = mongoose.model("NewsUp", newsUpSchema);

//==========================================================================================

const newsDownSchema = Schema({
    descriptionAze: String,
    descriptionEng: String,
    socialMedia: {
        twitterBtnUrl: String,
        facebookBtnUrl: String,
        tikTokBtnUrl: String,
        instagramBtnUrl: String,
        whatsappBtnUrl: String
    },
    tags: [String],

}, { timestamps: true });

const newsDownValidate = (newsDown) => {
    const schema = new Joi.object({
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),
        socialMedia: Joi.object({
            twitterBtnUrl: Joi.string().uri(),
            facebookBtnUrl: Joi.string().uri(),
            tikTokBtnUrl: Joi.string().uri(),
            instagramBtnUrl: Joi.string().uri(),
            whatsappBtnUrl: Joi.string().uri(),
        }),
        tags: Joi.array().items(Joi.string()),

    })
    return schema.validate(newsDown);
};

const NewsDown = mongoose.model("NewsDown", newsDownSchema);

//==========================================================================================

module.exports = {
    BlogPage, blogPageValidate,
    NewsUp, newsUpValidate,
    NewsDown, newsDownValidate
};