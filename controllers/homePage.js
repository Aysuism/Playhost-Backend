const {
    Slider, sliderValidate,
    HeroService, heroServiceValidate,
    HomeFooter, homeFooterValidate,
    PaymentMethod, paymentMethodValidate } = require("../models/homePage.js");

const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

//========================================================================================== homePage.js -> sliderSchema

exports.slider_all_list = async (req, res) => {
    const slider = await Slider.find();
    res.status(200).json(slider);
};

exports.slider_single_list = async (req, res) => {
    const slider = await Slider.findById(req.params.id);
    res.status(200).json(slider);
};

exports.slider_add = async (req, res) => {
    const { error } = sliderValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const slider = new Slider(req.body);
            slider.backgroundImageUrl = req.file.path;
            result = await slider.save();
        } else {
            const slider = new Slider(req.body);
            result = await slider.save();
        }
        res.status(201).send(result);
    }
};

exports.slider_edit = async (req, res) => {
    const { error } = sliderValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const slider = await Slider.findById(req.params.id);

        if (!slider) {
            return res.status(404).send("There is no slider related to this ID!");
        } else {

            if (!req.file) {
                const slider = await Slider.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await slider.save();

                res.status(200).json(slider);
            } else {
                const slider = await Slider.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(slider.backgroundImageUrl);
                slider.backgroundImageUrl = req.file.path;

                await slider.save();

                res.status(200).json(slider);

            }
        }
    }
};

exports.slider_delete = async (req, res) => {
    const slider = await Slider.findByIdAndDelete(req.params.id);
    if (!slider) {
        return res.status(404).send("The slider was deleted!");
    }
    res.status(200).send(slider);
};

//========================================================================================== homePage.js -> heroServiceSchema

exports.heroService_all_list = async (req, res) => {
    const heroService = await HeroService.find();
    res.status(200).json(heroService);
};

exports.heroService_single_list = async (req, res) => {
    const heroService = await HeroService.findById(req.params.id);
    res.status(200).json(heroService);
};

exports.heroService_add = async (req, res) => {
    const { error } = heroServiceValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const heroService = new HeroService(req.body);
            heroService.iconUrl = req.file.path;
            result = await heroService.save();
        } else {
            const heroService = new HeroService(req.body);
            result = await heroService.save();
        }
        res.status(201).send(result);
    }
};

exports.heroService_edit = async (req, res) => {
    const { error } = heroServiceValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const heroService = await HeroService.findById(req.params.id);

        if (!heroService) {
            return res.status(404).send("There is no hero service related to this ID!");
        } else {

            if (!req.file) {
                const heroService = await HeroService.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await heroService.save();

                res.status(200).json(heroService);
            } else {
                const heroService = await HeroService.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(heroService.iconUrl);
                heroService.iconUrl = req.file.path;

                await heroService.save();

                res.status(200).json(heroService);

            }
        }
    }
};

exports.heroService_delete = async (req, res) => {
    const heroService = await HeroService.findByIdAndDelete(req.params.id);
    if (!heroService) {
        return res.status(404).send("The hero service was deleted!");
    }
    res.status(200).send(heroService);
};

//========================================================================================== homePage.js -> homeFooterSchema

exports.homeFooter_all_list = async (req, res) => {
    const homeFooter = await HomeFooter.find();
    res.status(200).json(homeFooter);
};

exports.homeFooter_single_list = async (req, res) => {
    const homeFooter = await HomeFooter.findById(req.params.id);
    res.status(200).json(homeFooter);
};

exports.homeFooter_add = async (req, res) => {
    const { error } = homeFooterValidate(req.body);
    let result;
    if (error) {
        res.status(400).send(error.message);
    } else {
        if (req.file) {
            const homeFooter = new HomeFooter(req.body);
            homeFooter.backgroundImageUrl = req.file.path;
            result = await homeFooter.save();
        } else {
            const homeFooter = new HomeFooter(req.body);
            result = await homeFooter.save();
        }
        res.status(201).send(result);
    }
};

exports.homeFooter_edit = async (req, res) => {
    const { error } = homeFooterValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const homeFooter = await HomeFooter.findById(req.params.id);

        if (!homeFooter) {
            return res.status(404).send("There is no home footer related to this ID!");
        } else {

            if (!req.file) {
                const homeFooter = await HomeFooter.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await homeFooter.save();

                res.status(200).json(homeFooter);
            } else {
                const homeFooter = await HomeFooter.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                deleteSingleOldImage(homeFooter.backgroundImageUrl);
                homeFooter.backgroundImageUrl = req.file.path;

                await homeFooter.save();

                res.status(200).json(homeFooter);

            }
        }
    }
};

exports.homeFooter_delete = async (req, res) => {
    const homeFooter = await HomeFooter.findByIdAndDelete(req.params.id);
    if (!homeFooter) {
        return res.status(404).send("The home footer was deleted!");
    }
    res.status(200).send(homeFooter);
};

//========================================================================================== homePage.js -> paymentMethodSchema

exports.paymentMethod_all_list = async (req, res) => {
    const paymentMethod = await PaymentMethod.find();
    res.status(200).json(paymentMethod);
};

exports.paymentMethod_single_list = async (req, res) => {
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    res.status(200).json(paymentMethod);
};

exports.paymentMethod_add = async (req, res) => {
    const { error } = paymentMethodValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const paymentMethod = new PaymentMethod(req.body);
        const result = await paymentMethod.save();
        res.status(200).json(result);
    }
};

exports.paymentMethod_edit = async (req, res) => {
    const { error } = paymentMethodValidate(req.body);
    if (error) {
        res.status(400).send(error.messages);
    } else {
        const paymentMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, { ...req.body });
        await paymentMethod.save();
        res.status(200).json(paymentMethod);
    }
};

exports.paymentMethod_delete = async (req, res) => {
    const paymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
    if (!paymentMethod) {
        return res.status(404).send("The payment method was deleted!")
    }
    res.status(200).json(paymentMethod);
};





