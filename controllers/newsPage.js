const {
    BlogPage, blogPageValidate,
    NewsUp, newsUpValidate,
    NewsDown, newsDownValidate } = require("../models/newsPage.js");

const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

//========================================================================================== newsPage.js -> blogPageSchema

exports.blog_all_list = async (req, res) => {
    const blogPage = await BlogPage.find();
    res.status(200).json(blogPage);
};

exports.blog_single_list = async (req, res) => {
    const blogPage = await BlogPage.findById(req.params.id);
    res.status(200).json(blogPage);
};

exports.blog_add = async (req, res) => {
    const { error } = blogPageValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const blogPage = new BlogPage(req.body);
            blogPage.imageUrl = req.file.path;
            result = await blogPage.save();
        } else {
            const blogPage = new BlogPage(req.body);
            result = await blogPage.save();
        }
        res.status(201).send(result);
    }
};

exports.blog_edit = async (req, res) => {
    const { error } = blogPageValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const blogPage = await BlogPage.findById(req.params.id);

        if (!blogPage) {
            return res.status(404).send("There is no blog related to this ID!");
        } else {

            if (!req.file) {
                const blogPage = await BlogPage.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await blogPage.save();

                res.status(200).json(blogPage);
            } else {
                const blogPage = await BlogPage.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(blogPage.imageUrl);
                blogPage.imageUrl = req.file.path;

                await blogPage.save();

                res.status(200).json(blogPage);

            }
        }
    }
};

exports.blog_delete = async (req, res) => {
    const blogPage = await BlogPage.findByIdAndDelete(req.params.id);
    if (!blogPage) {
        return res.status(404).send("The blog was deleted!");
    }
    res.status(200).send(blogPage);
};

//========================================================================================== newsPage.js -> newsUpSchema

exports.newsUp_all_list = async (req, res) => {
    const newsUp = await NewsUp.find();
    res.status(200).json(newsUp);
};

exports.newsUp_single_list = async (req, res) => {
    const newsUp = await NewsUp.findById(req.params.id);
    res.status(200).json(newsUp);
};

exports.newsUp_add = async (req, res) => {
    const { error } = newsUpValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const newsUp = new NewsUp(req.body);
            newsUp.backgroundImageUrl = req.file.path;
            result = await newsUp.save();
        } else {
            const newsUp = new NewsUp(req.body);
            result = await newsUp.save();
        }
        res.status(201).send(result);
    }
};

exports.newsUp_edit = async (req, res) => {
    const { error } = newsUpValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const newsUp = await NewsUp.findById(req.params.id);

        if (!newsUp) {
            return res.status(404).send("There is no news up related to this ID!");
        } else {

            if (!req.file) {
                const newsUp = await NewsUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await newsUp.save();

                res.status(200).json(newsUp);
            } else {
                const newsUp = await NewsUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(newsUp.backgroundImageUrl);
                newsUp.backgroundImageUrl = req.file.path;

                await newsUp.save();

                res.status(200).json(newsUp);

            }
        }
    }
};

exports.newsUp_delete = async (req, res) => {
    const newsUp = await NewsUp.findByIdAndDelete(req.params.id);
    if (!newsUp) {
        return res.status(404).send("The news up was deleted!");
    }
    res.status(200).send(newsUp);
};

//========================================================================================== newsPage.js -> newsDownSchema

exports.newsDown_all_list = async (req, res) => {
    const newsDown = await NewsDown.find();
    res.status(200).json(newsDown);
};

exports.newsDown_single_list = async (req, res) => {
    const newsDown = await NewsDown.findById(req.params.id);
    res.status(200).json(newsDown);
};

exports.newsDown_add = async (req, res) => {
    const { error } = newsDownValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const newsDown = new NewsDown(req.body);
        const result = await newsDown.save();
        res.status(200).json(result);
    }
};

exports.newsDown_edit = async (req, res) => {
    const { error } = newsDownValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const newsDown = await NewsDown.findByIdAndUpdate(req.params.id, { ...req.body });
        await newsDown.save();
        res.status(200).json(newsDown);
    }
};

exports.newsDown_delete = async (req, res) => {
    const newsDown = await NewsDown.findByIdAndDelete(req.params.id);
    if (!newsDown) {
        return res.status(404).send("The news down was deleted!")
    }
    res.status(200).json(newsDown);
};
