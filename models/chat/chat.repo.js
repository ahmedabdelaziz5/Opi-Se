const chatModel = require('./chat.model');

// function to update ( send/delete ) messages in chat
exports.updateChat = async (filter, query, options) => {
    try {
        const chat = await chatModel.findOneAndUpdate(filter, query, options);
        if (!chat) {
            return {
                success: false,
                message: "error while updating chat !"
            }
        }
        return {
            success: true,
            message: "chat updated successfully !",
        }
    }
    catch (err) {
        return {
            success: false,
            message: err.message
        }
    }
};

// function to get ( chat / media / links ) from chat
exports.getChat = async (filter, query) => {
    try {

    }
    catch (err) {
        return {
            success: false,
            message: err.message
        }
    }
};

// function to upload media in chat
exports.uploadMedia = async (chatId) => {
    try {

    }
    catch (err) {
        return {
            success: false,
            message: err.message
        }
    }
};
