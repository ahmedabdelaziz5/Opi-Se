const { firebaseAdmin } = require("../config/fireBase.config");
const messaging = firebaseAdmin.messaging();


const checkType = (type) => {
    if (type === "newPartnerRequest") {
        return {
            message: "You have a new partner request !"
        }
    }
    else if (type === "acceptMatchRequest") {
        return {
            message: "Congratulations, you have a new partner !"
        }
    }
    else if (type === "rejectMatchRequest") {
        return {
            message: "unfortunately, your partner request has been rejected !, try another recommendation !"
        }
    }

}


exports.sendNotification = async (deviceToken, type) => {

    try {

        let body = checkType(type);

        const message = {
            data: body,
            tokens: deviceToken
        };
        const result = await messaging.sendMulticast(message);

        if (result.successCount != 1) {
            return {
                success: false,
                statusCode: 417,
                message: "unable to send notification !",
            }
        }

        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: result
        }

    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: "unexpected error !",
            error : err.message
        }
    }
}
