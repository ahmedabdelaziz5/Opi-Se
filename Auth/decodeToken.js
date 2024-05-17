const jwt = require("jsonwebtoken");

// function to decode the token and make sure that the token has a valid signature
exports.decodeToken = () => {
    return async (req, res, next) => {
        try {
            let barerToken = req.headers.authorization;
            let token = barerToken.split(" ")[1];
            let decoded = jwt.verify(token, process.env.SECRET_JWT);
            req.user = decoded;
            next();
        }
        catch (err) {
            res.status(500).json({
                error: "Authentication error",
                message: "Invalid token !"
            });
        }
    }
};