const { GameCategory, gameCategoryValidate } = require("../models/gameCategory.js");

exports.category_all_list = async (req, res) => {
    const gameCategory = await GameCategory.find();
    res.status(200).json(gameCategory);
};

exports.category_single_list = async (req, res) => {
    const gameCategory = await GameCategory.findById(req.params.id);
    res.status(200).json(gameCategory);
};

exports.category_add = async (req, res) => {
    const { error } = gameCategoryValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const gameCategory = new GameCategory(req.body);
        const result = await gameCategory.save();
        res.status(200).json(result);
    }
};

exports.category_edit = async (req, res) => {
    const { error } = gameCategoryValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const gameCategory = await GameCategory.findByIdAndUpdate(req.params.id, { ...req.body });
        await gameCategory.save();
        res.status(200).json(gameCategory);
    }
};

exports.category_delete = async (req, res) => {
    const gameCategory = await GameCategory.findByIdAndDelete(req.params.id);
    if (!gameCategory) {
        return res.status(404).send("The category was deleted!")
    }
    res.status(200).json(gameCategory);
};
