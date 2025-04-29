const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');

const generalSettingsSchema = Schema({
    titleAze: String,
    titleEng: String,
    favIcon: [String],
    logo: [String],
    descriptionAze: String,
    descriptionEng: String,
    socialMedia: {
        twitterBtnUrl: String,
        facebookBtnUrl: String,
        tikTokBtnUrl: String,
        instagramBtnUrl: String,
        whatsappBtnUrl: String
    },

}, { timestamps: true });

const generalSettingsValidate = (generalSettings) => {
    const schema = new Joi.object({
        titleAze: Joi.string(),
        titleEng: Joi.string(),
        favIcon: Joi.array().items(Joi.string()),
        logo: Joi.array().items(Joi.string()),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),
        socialMedia: Joi.object({
            twitterBtnUrl: Joi.string().uri(),
            facebookBtnUrl: Joi.string().uri(),
            tikTokBtnUrl: Joi.string().uri(),
            instagramBtnUrl: Joi.string().uri(),
            whatsappBtnUrl: Joi.string().uri(),
        }),
        
    })
    return schema.validate(generalSettings);
};

const GeneralSettings = mongoose.model("GeneralSettings", generalSettingsSchema);

module.exports = { GeneralSettings, generalSettingsValidate };