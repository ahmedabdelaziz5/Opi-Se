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
        const totalNumOfItems = data[select].length;
        const start_index = Math.max(0, totalNumOfItems - skip - pagg.limit);
        const end_index = Math.min(totalNumOfItems - skip, totalNumOfItems);
        return {
            statusCode: 200,
            success: true,
            message: "success",
            totalNumOfItems: totalNumOfItems,
            totalPages: Math.ceil(data[select].length / pagg.limit),
            currentPage: pagg.page,
            data: data[select].slice(start_index, end_index).reverse()
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
