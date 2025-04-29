const {
    ContactUp, contactUpValidate,
    ContactDown, contactDownValidate } = require("../models/contactPage.js");

const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

//========================================================================================== contactPage.js -> contactUpSchema

exports.contactUp_all_list = async (req, res) => {
    const contactUp = await ContactUp.find();
    res.status(200).json(contactUp);
};

exports.contactUp_single_list = async (req, res) => {
    const contactUp = await ContactUp.findById(req.params.id);
    res.status(200).json(contactUp);
};

exports.contactUp_add = async (req, res) => {
    const { error } = contactUpValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const contactUp = new ContactUp(req.body);
            contactUp.backgroundImageUrl = req.file.path;
            result = await contactUp.save();
        } else {
            const contactUp = new ContactUp(req.body);
            result = await contactUp.save();
        }
        res.status(201).send(result);
    }
};

exports.contactUp_edit = async (req, res) => {
    const { error } = contactUpValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const contactUp = await ContactUp.findById(req.params.id);

        if (!contactUp) {
            return res.status(404).send("There is no contact up related to this ID!");
        } else {

            if (!req.file) {
                const contactUp = await ContactUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await contactUp.save();

                res.status(200).json(contactUp);
            } else {
                const contactUp = await ContactUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(contactUp.backgroundImageUrl);
                contactUp.backgroundImageUrl = req.file.path;

                await contactUp.save();

                res.status(200).json(contactUp);

            }
        }
    }
};

exports.contactUp_delete = async (req, res) => {
    const contactUp = await ContactUp.findByIdAndDelete(req.params.id);
    if (!contactUp) {
        return res.status(404).send("The contact up was deleted!");
    }
    res.status(200).send(contactUp);
};

//========================================================================================== contactPage.js -> contactDownSchema

exports.contactDown_all_list = async (req, res) => {
    const contactDown = await ContactDown.find();
    res.status(200).json(contactDown);
};

exports.contactDown_single_list = async (req, res) => {
    const contactDown = await ContactDown.findById(req.params.id);
    res.status(200).json(contactDown);
};

exports.contactDown_add = async (req, res) => {
    const { error } = contactDownValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const contactDown = new ContactDown(req.body);
        const result = await contactDown.save();
        res.status(200).json(result);
    }
};

exports.contactDown_edit = async (req, res) => {
    const { error } = contactDownValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const contactDown = await ContactDown.findByIdAndUpdate(req.params.id, { ...req.body });
        await contactDown.save();
        res.status(200).json(contactDown);
    }
};

exports.contactDown_delete = async (req, res) => {
    const contactDown = await ContactDown.findByIdAndDelete(req.params.id);
    if (!contactDown) {
        return res.status(404).send("The contact down was deleted!")
    }
    res.status(200).json(contactDown);
};
