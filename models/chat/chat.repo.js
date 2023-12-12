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
exports.getChatData = async (filter, select, pagg) => {
    try {
        const skip = (pagg.page - 1) * pagg.limit;
        const data = await chatModel.findOne(filter).lean();
        if (data) var paggedData = data[select].slice(skip, skip + pagg.limit);
        if (!data || !paggedData.length) {
            return {
                statusCode: 200,
                message: `there is no ${select} yet!`,
            };
        }
        return {
            statusCode: 200,
            success: true,
            message: "success",
            totalNumOfItems: data[select].length,
            totalPages: Math.ceil(data[select].length / pagg.limit),
            currentPage: pagg.page,
            data: paggedData,
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            success: false,
            message: err.message,
        };
    }
};
