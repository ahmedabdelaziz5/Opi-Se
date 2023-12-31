// function to decode token 
const jwt = require("jsonwebtoken");

exports.getTokenData = (barerToken) => {
    try {
        let decoded = jwt.verify(barerToken, process.env.SECRET_JWT);
        decoded['success'] = true;
        return decoded;
    }
    catch (err) {
        return {
            status: 401,
            success: false,
            message: "Not Authorized !"
        };
    }
};   
