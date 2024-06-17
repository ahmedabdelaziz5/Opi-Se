const { firebaseAdmin } = require("../config/fireBase.config");
const notificationMessages = require('../messages/pushNotifications.messages');
const messaging = firebaseAdmin.messaging();

// function that checks the type of the notification and return the message of the notification
const checkType = (type) => {
    if (type === "newPartnerRequest") {
        return {
            message: notificationMessages.newPartnerRequest
        }
    }
    else if (type === "acceptMatchRequest") {
        return {
            message: notificationMessages.acceptMatchRequest
        }
    }
    else if (type === "rejectMatchRequest") {
        return {
            message: notificationMessages.rejectMatchRequest
        }
    }
    else if (type === "disMatchWithPartner") {
        return {
            message: notificationMessages.disMatchWithPartner
        }
    }

};

// function that sends the push notifications using firebase
exports.sendNotification = async (deviceToken, type) => {

    try {

        let body = checkType(type);

        const message = {
            data: body,
            tokens: deviceToken
        };
        const result = await messaging.sendEachForMulticast(message);

        if (result.successCount != 1) {
            return {
                success: false,
                statusCode: 417,
                message: "unable to send notification !",
            };
        }

        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: result
        };

    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: "Unexpected error, could not sent notification !",
            error: err.message
        };
    };
};
