const Joi = require("joi");
const { default: mongoose, Schema } = require('mongoose');

const gameCategorySchema = Schema({
    categoryId: Number,
    category: String,

}, { timestamps: true });


const gameCategoryValidate = (gameCategory) => {
    const schema = new Joi.object({
        categoryId: Joi.number(),
        category: Joi.string(),

    })
    return schema.validate(gameCategory);
};

const GameCategory = mongoose.model("GameCategory", gameCategorySchema);

module.exports = { GameCategory, gameCategoryValidate };