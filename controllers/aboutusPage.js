const {
    AboutusUp, aboutusUpValidate,
    Introduction, introductionValidate,
    Team, teamValidate,
    CustomerReviews, customerReviewsValidate,
    Counter, counterValidate, } = require("../models/aboutusPage.js");

const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

//========================================================================================== aboutusPage.js -> aboutusUpSchema

exports.aboutusUp_all_list = async (req, res) => {
    const aboutusUp = await AboutusUp.find();
    res.status(200).json(aboutusUp);
};

exports.aboutusUp_single_list = async (req, res) => {
    const aboutusUp = await AboutusUp.findById(req.params.id);
    res.status(200).json(aboutusUp);
};

exports.aboutUsUp_add = async (req, res) => {
    const { error } = aboutusUpValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const aboutusUp = new AboutusUp(req.body);
            aboutusUp.backgroundImageUrl = req.file.path;
            result = await aboutusUp.save();
        } else {
            const aboutusUp = new AboutusUp(req.body);
            result = await aboutusUp.save();
        }
        res.status(201).send(result);
    }
};

exports.aboutusUp_edit = async (req, res) => {
    const { error } = aboutusUpValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const aboutusUp = await AboutusUp.findById(req.params.id);

        if (!aboutusUp) {
            return res.status(404).send("There is no about us up related to this ID!");
        } else {

            if (!req.file) {
                const aboutusUp = await AboutusUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await aboutusUp.save();

                res.status(200).json(aboutusUp);
            } else {
                const aboutusUp = await AboutusUp.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(aboutusUp.backgroundImageUrl);
                aboutusUp.backgroundImageUrl = req.file.path;

                await aboutusUp.save();

                res.status(200).json(aboutusUp);

            }
        }
    }
};

exports.aboutusUp_delete = async (req, res) => {
    const aboutusUp = await AboutusUp.findByIdAndDelete(req.params.id);
    if (!aboutusUp) {
        return res.status(404).send("The about us up was deleted!");
    }
    res.status(200).send(aboutusUp);
};

//========================================================================================== aboutusPage.js -> introductionSchema

exports.introduction_all_list = async (req, res) => {
    const introduction = await Introduction.find();
    res.status(200).json(introduction);
};

exports.introduction_single_list = async (req, res) => {
    const introduction = await Introduction.findById(req.params.id);
    res.status(200).json(introduction);
};

exports.introduction_add = async (req, res) => {
    const { error } = introductionValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const introduction = new Introduction(req.body);
            introduction.imageUrl = req.file.path;
            result = await introduction.save();
        } else {
            const introduction = new Introduction(req.body);
            result = await introduction.save();
        }
        res.status(201).send(result);
    }
};

exports.introduction_edit = async (req, res) => {
    const { error } = introductionValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const introduction = await Introduction.findById(req.params.id);

        if (!introduction) {
            return res.status(404).send("There is no introduction related to this ID!");
        } else {

            if (!req.file) {
                const introduction = await Introduction.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await introduction.save();

                res.status(200).json(introduction);
            } else {
                const introduction = await Introduction.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(introduction.imageUrl);
                introduction.imageUrl = req.file.path;

                await introduction.save();

                res.status(200).json(introduction);

            }
        }
    }
};

exports.introduction_delete = async (req, res) => {
    const introduction = await Introduction.findByIdAndDelete(req.params.id);
    if (!introduction) {
        return res.status(404).send("The introduction was deleted!");
    }
    res.status(200).send(introduction);
};

//========================================================================================== aboutusPage.js -> teamSchema

exports.team_all_list = async (req, res) => {
    const team = await Team.find();
    res.status(200).json(team);
};

exports.team_single_list = async (req, res) => {
    const team = await Team.findById(req.params.id);
    res.status(200).json(team);
};

exports.team_add = async (req, res) => {
    const { error } = teamValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const team = new Team(req.body);
            team.teamImage = req.file.path;
            result = await team.save();
        } else {
            const team = new Team(req.body);
            result = await team.save();
        }
        res.status(201).send(result);
    }
};

exports.team_edit = async (req, res) => {
    const { error } = teamValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).send("There is no team related to this ID!");
        } else {

            if (!req.file) {
                const team = await Team.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await team.save();

                res.status(200).json(team);
            } else {
                const team = await Team.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(team.teamImage);
                team.teamImage = req.file.path;

                await team.save();

                res.status(200).json(team);

            }
        }
    }
};

exports.team_delete = async (req, res) => {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
        return res.status(404).send("The team was deleted!");
    }
    res.status(200).send(team);
};

//========================================================================================== aboutusPage.js -> customerReviewsSchema

exports.customerReviews_all_list = async (req, res) => {
    const customerReviews = await CustomerReviews.find();
    res.status(200).json(customerReviews);
};

exports.customerReviews_single_list = async (req, res) => {
    const customerReviews = await CustomerReviews.findById(req.params.id);
    res.status(200).json(customerReviews);
};

exports.customerReviews_add = async (req, res) => {
    const { error } = customerReviewsValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const customerReviews = new CustomerReviews(req.body);
            customerReviews.avatarUrl = req.file.path;
            result = await customerReviews.save();
        } else {
            const customerReviews = new CustomerReviews(req.body);
            result = await customerReviews.save();
        }
        res.status(201).send(result);
    }
};

exports.customerReviews_edit = async (req, res) => {
    const { error } = customerReviewsValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const customerReviews = await CustomerReviews.findById(req.params.id);

        if (!customerReviews) {
            return res.status(404).send("There is no customer review related to this ID!");
        } else {

            if (!req.file) {
                const customerReviews = await CustomerReviews.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await customerReviews.save();

                res.status(200).json(customerReviews);
            } else {
                const customerReviews = await CustomerReviews.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(customerReviews.avatarUrl);
                customerReviews.avatarUrl = req.file.path;

                await customerReviews.save();

                res.status(200).json(customerReviews);

            }
        }
    }
};

exports.customerReviews_delete = async (req, res) => {
    const customerReviews = await CustomerReviews.findByIdAndDelete(req.params.id);
    if (!customerReviews) {
        return res.status(404).send("The customer review was deleted!");
    }
    res.status(200).send(customerReviews);
};

//========================================================================================== aboutusPage.js -> counterSchema

exports.counter_all_list = async (req, res) => {
    const counter = await Counter.find();
    res.status(200).json(counter);
};

exports.counter_single_list = async (req, res) => {
    const counter = await Counter.findById(req.params.id);
    res.status(200).json(counter);
};

exports.counter_add = async (req, res) => {
    const { error } = counterValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const counter = new Counter(req.body);
        const result = await counter.save();
        res.status(200).json(result);
    }
};

exports.counter_edit = async (req, res) => {
    const { error } = counterValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const counter = await Counter.findByIdAndUpdate(req.params.id, { ...req.body });
        await counter.save();
        res.status(200).json(counter);
    }
};

exports.counter_delete = async (req, res) => {
    const counter = await Counter.findByIdAndDelete(req.params.id);
    if (!counter) {
        return res.status(404).send("The counter was deleted!")
    }
    res.status(200).json(counter);
};


