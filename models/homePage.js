const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');

const sliderSchema = Schema({
    spanAze: String,
    spanEng: String,
    backgroundImageUrl: String,
    gameId: Number,
    heading: String,
    descriptionAze: String,
    descriptionEng: String,
    price: Number,
    btnUrlAze: String,
    btnUrlEng: String,

}, { timestamps: true });

const sliderValidate = (slider) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        backgroundImageUrl: Joi.string(),
        gameId: Joi.number().default(1),
        heading: Joi.string(),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),
        price: Joi.number(),
        btnUrlAze: Joi.string(),
        btnUrlEng: Joi.string(),

    })
    return schema.validate(slider);
};

const Slider = mongoose.model("Slider", sliderSchema);

//==========================================================================================

const heroServiceSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    iconUrl: String,
    titleAze: String,
    titleEng: String,
    descriptionAze: String,
    descriptionEng: String,

}, { timestamps: true });

const heroServiceValidate = (heroService) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        iconUrl: Joi.string(),
        titleAze: Joi.string(),
        titleEng: Joi.string(),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),

    })
    return schema.validate(heroService);
};

const HeroService = mongoose.model("HeroService", heroServiceSchema);

//==========================================================================================

const homeFooterSchema = Schema({
    spanAze: String,
    spanEng: String,
    backgroundImageUrl: String,
    headingAze: String,
    headingEng: String,
    descriptionAze: String,
    descriptionEng: String,
    appStoreBtnUrl: String,
    playStoreBtnUrl: String,

}, { timestamps: true });

const homeFooterValidate = (homeFooter) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        backgroundImageUrl: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        descriptionAze: Joi.string(),
        descriptionEng: Joi.string(),
        appStoreBtnUrl: Joi.string(),
        playStoreBtnUrl: Joi.string(),

    })
    return schema.validate(homeFooter);
};

const HomeFooter = mongoose.model("HomeFooter", homeFooterSchema);

//==========================================================================================

const paymentMethodSchema = Schema({
    spanAze: String,
    spanEng: String,
    headingAze: String,
    headingEng: String,
    visaBtnUrl: String,
    masterCardBtnUrl: String,
    payPalBtnUrl: String,
    skrilBtnUrl: String,
    jcbBtnUrl: String,
    americanExpressBtnUrl: String,

}, { timestamps: true });

const paymentMethodValidate = (paymentMethod) => {
    const schema = new Joi.object({
        spanAze: Joi.string(),
        spanEng: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        visaBtnUrl: Joi.string(),
        masterCardBtnUrl: Joi.string(),
        payPalBtnUrl: Joi.string(),
        skrilBtnUrl: Joi.string(),
        jcbBtnUrl: Joi.string(),
        americanExpressBtnUrl: Joi.string(),

    })
    return schema.validate(paymentMethod);
};

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

//==========================================================================================

module.exports = {
    Slider, sliderValidate,
    HeroService, heroServiceValidate,
    HomeFooter, homeFooterValidate,
    PaymentMethod, paymentMethodValidate
};
