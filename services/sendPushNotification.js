const { firebaseAdmin } = require("../config/fireBase.config");
const messaging = firebaseAdmin.messaging();


exports.sendNotification = async (deviceToken) => {

    try {

        const message = {
            data: {
                message: 'you have a new partner request !',
            },
            tokens: deviceToken
        };
        const result = await messaging.sendMulticast(message);

        if (result.successCount != 1) {
            return {
                success: false,
                statusCode: 500,
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
        }
    }
}
