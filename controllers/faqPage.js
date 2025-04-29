const {
    FaqUp, faqUpValidate,
    FaqDown, faqDownValidate } = require("../models/faqPage.js");

const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

//========================================================================================== faqPage.js -> faqUpSchema

exports.faqUp_all_list = async (req, res) => {
    const faqUp = await FaqUp.find();
    res.status(200).json(faqUp);
};

exports.faqUp_single_list = async (req, res) => {
    const faqUp = await FaqUp.findById(req.params.id);
    res.status(200).json(faqUp);
};

exports.faqUp_add = async (req, res) => {
    const { error } = faqUpValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const faqUp = new FaqUp(req.body);
            faqUp.backgroundImageUrl = req.file.path;
            result = await faqUp.save();
        } else {
            const faqUp = new FaqUp(req.body);
            result = await faqUp.save();
        }
        res.status(201).send(result);
    }
};

exports.faqUp_edit = async (req, res) => {
    const { error } = faqUpValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const faqUp = await FaqUp.findById(req.params.id);

        if (!faqUp) {
            return res.status(404).send("There is no faq up related to this ID!");
        } else {

            if (!req.file) {
                const faqUp = await FaqUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await faqUp.save();

                res.status(200).json(faqUp);
            } else {
                const faqUp = await FaqUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(faqUp.backgroundImageUrl);
                faqUp.backgroundImageUrl = req.file.path;

                await faqUp.save();

                res.status(200).json(faqUp);

            }
        }
    }
};

exports.faqUp_delete = async (req, res) => {
    const faqUp = await FaqUp.findByIdAndDelete(req.params.id);
    if (!faqUp) {
        return res.status(404).send("The faq up was deleted!");
    }
    res.status(200).send(faqUp);
};

//========================================================================================== faqPage.js -> faqDownSchema

exports.faqDown_all_list = async (req, res) => {
    const faqDown = await FaqDown.find();
    res.status(200).json(faqDown);
};

exports.faqDown_single_list = async (req, res) => {
    const faqDown = await FaqDown.findById(req.params.id);
    res.status(200).json(faqDown);
};

exports.faqDown_add = async (req, res) => {
    const { error } = faqDownValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const faqDown = new FaqDown(req.body);
        const result = await faqDown.save();
        res.status(200).json(result);
    }
};

exports.faqDown_edit = async (req, res) => {
    const { error } = faqDownValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const faqDown = await FaqDown.findByIdAndUpdate(req.params.id, { ...req.body });
        await faqDown.save();
        res.status(200).json(faqDown);
    }
};

exports.faqDown_delete = async (req, res) => {
    const faqDown = await FaqDown.findByIdAndDelete(req.params.id);
    if (!faqDown) {
        return res.status(404).send("The faq down was deleted!")
    }
    res.status(200).json(faqDown);
};

