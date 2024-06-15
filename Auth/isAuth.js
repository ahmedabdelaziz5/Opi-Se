// function to check if the user is authorized or not ( role based ) !  
const rbac = require("../rbac/rbac");
const jwt = require('jsonwebtoken');
const { handler, APIError } = require("../helpers/envError");

module.exports = (endpoints) => {
    return async (req, res, next) => {
        try {
            let barerToken = req.headers.authorization;
            let token = barerToken.split(" ")[1];
            let decoded = jwt.verify(token, process.env.SECRET_JWT);
            const isAllowed = await rbac.can(decoded.role, endpoints);
            if (!isAllowed) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: "Not Allowed To Perform This Action !",
                });
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            let e = new APIError({
                success: false,
                message: "Invalid Authorization Token !",
                status: 401
            });
            return handler(e, req, res);
        };
    }
};