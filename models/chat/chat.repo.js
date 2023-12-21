const chatModel = require('./chat.model');

// function to update ( send / delete ) messages in chat
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
exports.getChatData = async (filter, populate, select, pagg, user) => {
    try {
        const skip = (pagg.page - 1) * pagg.limit;
        const data = await chatModel.findOne(filter).populate(populate).select(select).lean();
        if (data === null || data[select].length === 0) {
            return {
                statusCode: 200,
                message: `there is no ${select} yet!`
            }
        }
        if (data.matchId.firstPartnerId.toString() !== user && data.matchId.secondPartnerId.toString() !== user) {
            return {
                statusCode: 401,
                message: "Not Authorized !"
            }
        }
        let paggedData = data[select].slice(skip, skip + pagg.limit);
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
