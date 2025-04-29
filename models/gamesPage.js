const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');
const { GameCategory } = require("./gameCategory");

const gamesPageSchema = Schema({
    spanAzeFirst: String,
    spanEngFirst: String,
    headingAze: String,
    headingEng: String,
    gameId: { type: Number, default: 1 },
    gameName: String,
    originalPrice: Number,
    discountIndicator: { type: Boolean, default: false },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    discountedPrice: Number,
    gameCategory: { type: Schema.Types.ObjectId, ref: "GameCategory" },
    imageUrl: [String],
    gameBtnUrl: String,
    backgroundImageUrl: [String],
    spanAzeSecond: String,
    spanEngSecond: String,
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, required: true, min: 0 },
    slotHeadingAze: String,
    slotHeadingEng: String,
    slotDescriptionAze: String,
    slotDescriptionEng: String,
    slot: { type: Number, default: 250, min: 0, max: 500 },
    durationAze: String,
    durationEng: String,
    durationDescriptionAze: String,
    durationDescriptionEng: String,
    duration: { type: Number, default: 7, enum: [1, 3, 7, 30, 90, 365] },
    locationAze: String,
    locationEng: String,
    locationDescriptionAze: String,
    locationDescriptionEng: String,
    location: [
        {
            country: String,
            flagUrl: String,
            isSelected: { type: Boolean, default: false },
        },
    ],

}, { timestamps: true });

const gamesPageValidate = (gamesPage) => {
    const schema = new Joi.object({
        spanAzeFirst: Joi.string(),
        spanEngFirst: Joi.string(),
        headingAze: Joi.string(),
        headingEng: Joi.string(),
        gameId: Joi.number().default(1),
        gameName: Joi.string(),
        originalPrice: Joi.number(),
        discountIndicator: Joi.boolean(),
        discount: Joi.number().min(0).max(100),
        discountedPrice: Joi.number(),
        gameCategory: Joi.string(),
        imageUrl: Joi.array().items(Joi.string()),
        gameBtnUrl: Joi.string(),
        backgroundImageUrl: Joi.array().items(Joi.string()),
        spanAzeSecond: Joi.string(),
        spanEngSecond: Joi.string(),
        rating: Joi.number().min(0).max(5),
        reviews: Joi.number().min(0),
        slotHeadingAze: Joi.string(),
        slotHeadingEng: Joi.string(),
        slotDescriptionAze: Joi.string(),
        slotDescriptionEng: Joi.string(),
        slot: Joi.number().min(0).max(500),
        durationAze: Joi.string(),
        durationEng: Joi.string(),
        durationDescriptionAze: Joi.string(),
        durationDescriptionEng: Joi.string(),
        duration: Joi.number().valid(1, 3, 7, 30, 90, 365).default(7),
        locationAze: Joi.string(),
        locationEng: Joi.string(),
        locationDescriptionAze: Joi.string(),
        locationDescriptionEng: Joi.string(),
        location: Joi.array().items(
            Joi.object({
                country: Joi.string(),
                flagUrl: Joi.string(),
                isSelected: Joi.boolean().default(false),
            })
        )
    });

    return schema.validate(gamesPage);
};

const GamesPage = mongoose.model("GamesPage", gamesPageSchema);

//==========================================================================================

const gameCustomerReviewsSchema = Schema({
    commentId: Number,
    fullname: String,
    avatarUrl: String,
    reyting: Number,
    comment: String,
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
}, { timestamps: true });


const gameCustomerReviewsValidate = (gameCustomerReviews) => {
    const schema = new Joi.object({
        commentId: Joi.number(),
        fullname: Joi.string(),
        avatarUrl: Joi.string(),
        reyting: Joi.number().min(1).max(5),
        comment: Joi.string(),
        gameId: Joi.string().required(), // ← validate this too
    });
    return schema.validate(gameCustomerReviews);
};


const GameCustomerReviews = mongoose.model("GameCustomerReviews", gameCustomerReviewsSchema);

//==========================================================================================

module.exports = {
    GamesPage, gamesPageValidate,
    GameCustomerReviews, gameCustomerReviewsValidate
};