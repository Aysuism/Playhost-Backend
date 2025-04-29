const { 
    User, userValidate,
    loginValidate } = require("../models/user.js");

var bcrypt = require("bcrypt");

exports.user_auth = async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) {
        return res.status(400).send(error.mesaage);
    } else {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("You don't have an account!");
        } else {
            const isSuccess = await bcrypt.compare(req.body.password, user.password);
            if (!isSuccess) {
                return res.status(403).send("Email or password is wrong!")
            } else {
                const token = user.createAuthToken();
                res.header("my-token", token).send(token);
            }
        }
    }
};

exports.user_all_list = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
};

exports.user_single_list = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
};

exports.user_add = async function (req, res) {
    var validation = userValidate(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.message);
    }

    var existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(401).send("This user already exists!");
    }

    if (req.body.role === "admin") {
        return res.status(403).send("ATTENTION! You don't have the authority to be an admin!");
    }

    var hashPassword = await bcrypt.hash(req.body.password, 10);
    var user = new User(req.body);
    user.password = hashPassword;

    var token = user.createAuthToken();
    var result = await user.save();

    res.status(201).header("x-auth-token", token).send(result);
};

exports.user_edit = async (req, res) => {
    const { error } = userValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send("There is no user related to this ID!");
        } else {

            if (!req.file) {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });
                await user.save();

                res.status(200).json(user);
            } else {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                });

                await user.save();

                res.status(200).json(user);

            }
        }
    }
};

exports.user_delete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).send("The user was deleted!");
    }
    res.status(200).send(user);
};