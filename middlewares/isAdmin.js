var jwt = require("jsonwebtoken");

var isAdmin = function (req, res, next) {

    if (process.env.SKIP_AUTH === "true") {
        return next(); // 🔓 bypass admin middleware
    }




    var token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send("You don't have an authorization!");
    }
    try {
        var decodedToken = jwt.verify(token, "jwtPrivateKey");
        req.user = decodedToken;
        if (decodedToken.role !== "admin") {
            return res.status(403).send("You don't have permission to see admin authorities!");
        }
        next();
    } catch (error) {
        res.status(401).send("Wrong token!");
    }
};

module.exports = isAdmin;