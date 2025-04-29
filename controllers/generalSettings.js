const { GeneralSettings, generalSettingsValidate } = require("../models/generalSettings.js");

const { deleteManyOldImage } = require("../utils/deleteOldImage.js");

exports.generalsettings_all_list = async (req, res) => {
    const generalSettings = await GeneralSettings.find();
    res.status(200).json(generalSettings);
};

exports.generalsettings_single_list = async (req, res) => {
    const generalSettings = await GeneralSettings.findById(req.params.id);
    res.status(200).json(generalSettings);
};

exports.generalsettings_add = async (req, res) => {
    const { error } = generalSettingsValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    let fileObj = req.files;
    let filesObjLength = Object.keys(fileObj).length;

    const generalSettings = new GeneralSettings(req.body);

    if (filesObjLength > 0) {
        const uploadFavIcon = [];
        const uploadLogo = [];

        if (req.files.favIcon) {
            req.files.favIcon.forEach(item => uploadFavIcon.push(item.path));
        }

        if (req.files.logo) {
            req.files.logo.forEach(item => uploadLogo.push(item.path));
        }

        generalSettings.favIcon = uploadFavIcon;
        generalSettings.logo = uploadLogo;
    }

    const result = await generalSettings.save();
    res.status(201).send(result);
};

exports.generalsettings_edit = async (req, res) => {
    const { error } = generalSettingsValidate(req.body);
    const paramsId = req.params.id;
    if (error) {
        return res.status(400).send(error.message);
    }

    let generalSettings = await GeneralSettings.findById(paramsId);
    if (!generalSettings) {
        return res.status(404).send("There is no general setting related to this ID!");
    }

    if (req.files && Object.keys(req.files).length > 0) {
        await deleteManyOldImage(generalSettings.favIcon);
        await deleteManyOldImage(generalSettings.logo);

        const uploadFavIcon = req.files.favIcon
            ? req.files.favIcon.map(item => item.path)
            : [];

        const uploadLogo = req.files.logo
            ? req.files.logo.map(item => item.path)
            : [];

        generalSettings.favIcon = uploadFavIcon;
        generalSettings.logo = uploadLogo;
    }

    generalSettings = await GeneralSettings.findByIdAndUpdate(
        paramsId,
        { ...req.body, favIcon: generalSettings.favIcon, logo: generalSettings.logo },
        { new: true }
    );

    await generalSettings.save();
    res.status(200).json(generalSettings);
};

exports.generalsettings_delete = async (req, res) => {
    const generalSettings = await GeneralSettings.findByIdAndDelete(req.params.id);
    if (!generalSettings) {
        return res.status(404).send("The general setting was deleted!");
    }

    deleteManyOldImage(generalSettings.favIcon);
    deleteManyOldImage(generalSettings.logo);

    res.status(200).send(generalSettings);
};
