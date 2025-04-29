const newToken = async (req, res, next) => {
    try {
        const token = "1"
        const incomingToken = req.headers["my-token"]

        if (!Object.keys(req.headers).includes("my-token")) {
            return res.status(401).send("No Access!")
        }
        if (!token) {
            return res.status(401).send("No Access!")
        }
        if (!incomingToken) {
            return res.status(401).send("No Access!")
        }

        next();
    }
    catch (error) {

    }
}

export default newToken;