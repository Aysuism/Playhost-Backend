const {
    GamesPage, gamesPageValidate,
    GameCustomerReviews, gameCustomerReviewsValidate } = require("../models/gamesPage.js");

const { deleteSingleOldImage, deleteManyOldImage } = require("../utils/deleteOldImage.js");

//========================================================================================== gamesPage.js -> gamesPageSchema

exports.games_all_list = async (req, res) => {
    const gamesPage = await GamesPage.find().populate({
        path: "gameCategory",
        select: "categoryId category -_id"
    });
    res.status(200).json(gamesPage);
};

exports.games_all_list_for_category = async (req, res) => {
    const gamesPage = await GamesPage.find({ gameCategory: req.params.id }).populate({
        path: "gameCategory",
        select: "categoryId category -_id"
    });
    res.status(200).json(gamesPage);
};

exports.games_single_list = async (req, res) => {
    const gamesPage = await GamesPage.findById(req.params.id).populate({
        path: "gameCategory",
        select: "categoryId category -_id"
    });
    res.status(200).json(gamesPage);
};

exports.games_add = async (req, res) => {
    const { error } = gamesPageValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    let fileObj = req.files;
    let filesObjLength = Object.keys(fileObj).length;

    const gamesPage = new GamesPage(req.body);

    if (filesObjLength > 0) {
        const uploadImageUrl = [];
        const uploadBackgroundImageUrl = [];

        if (req.files.imageUrl) {
            req.files.imageUrl.forEach(item => uploadImageUrl.push(item.path));
        }

        if (req.files.backgroundImageUrl) {
            req.files.backgroundImageUrl.forEach(item => uploadBackgroundImageUrl.push(item.path));
        }

        gamesPage.imageUrl = uploadImageUrl;
        gamesPage.backgroundImageUrl = uploadBackgroundImageUrl;
    }

    const result = await gamesPage.save();
    res.status(201).send(result);
};

exports.games_edit = async (req, res) => {
    const { error } = gamesPageValidate(req.body);
    const paramsId = req.params.id;
    if (error) {
        return res.status(400).send(error.message);
    }

    let gamesPage = await GamesPage.findById(paramsId);
    if (!gamesPage) {
        return res.status(404).send("There is no game related to this ID!");
    }

    if (req.files && Object.keys(req.files).length > 0) {
        await deleteManyOldImage(gamesPage.imageUrl);
        await deleteManyOldImage(gamesPage.backgroundImageUrl);

        const uploadImageUrl = req.files.imageUrl
            ? req.files.imageUrl.map(item => item.path)
            : [];

        const uploadBackgroundImageUrl = req.files.backgroundImageUrl
            ? req.files.backgroundImageUrl.map(item => item.path)
            : [];

        gamesPage.imageUrl = uploadImageUrl;
        gamesPage.backgroundImageUrl = uploadBackgroundImageUrl;
    }

    gamesPage = await GamesPage.findByIdAndUpdate(
        paramsId,
        { ...req.body, imageUrl: gamesPage.imageUrl, backgroundImageUrl: gamesPage.backgroundImageUrl },
        { new: true }
    );

    await gamesPage.save();
    res.status(200).json(gamesPage);
};

exports.games_delete = async (req, res) => {
    const gamesPage = await GamesPage.findByIdAndDelete(req.params.id);
    if (!gamesPage) {
        return res.status(404).send("The game was deleted!");
    }

    deleteManyOldImage(gamesPage.imageUrl);
    deleteManyOldImage(gamesPage.backgroundImageUrl);

    res.status(200).send(gamesPage);
};

//========================================================================================== gamesPage.js -> customerReviewsSchema

exports.gameCustomerReviews_all_list = async (req, res) => {
    const gameCustomerReviews = await GameCustomerReviews.find();
    res.status(200).json(gameCustomerReviews);
};

exports.gameCustomerReviews_single_list = async (req, res) => {
    const gameCustomerReviews = await GameCustomerReviews.findById(req.params.id);
    res.status(200).json(gameCustomerReviews);
};

exports.gameCustomerReviews_add = async (req, res) => {
    const { error } = gameCustomerReviewsValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const gameCustomerReviews = new GameCustomerReviews(req.body);
            gameCustomerReviews.avatarUrl = req.file.path;
            result = await gameCustomerReviews.save();
        } else {
            const gameCustomerReviews = new GameCustomerReviews(req.body);
            result = await gameCustomerReviews.save();
        }
        res.status(201).send(result);
    }
};

exports.gameCustomerReviews_edit = async (req, res) => {
    const { error } = gameCustomerReviewsValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    const gameCustomerReviews = await GameCustomerReviews.findById(req.params.id);
    if (!gameCustomerReviews) {
        return res.status(404).send("There is no game customer review related to this ID!");
    }

    if (!req.file) {
        const updatedReview = await GameCustomerReviews.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).json(updatedReview);
    } else {
        const updatedReview = await GameCustomerReviews.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        deleteSingleOldImage(gameCustomerReviews.avatarUrl);
        updatedReview.avatarUrl = req.file.path;

        await updatedReview.save();
        return res.status(200).json(updatedReview);
    }
};


exports.gameCustomerReviews_delete = async (req, res) => {
    const gameCustomerReviews = await GameCustomerReviews.findByIdAndDelete(req.params.id);
    if (!gameCustomerReviews) {
        return res.status(404).send("The game customer review was deleted!");
    }
    res.status(200).send(gameCustomerReviews);
};
