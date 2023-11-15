const recommendationModel = require('./recommendation.model');
const userModel = require('../user/user.model');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// when user login for the first time we will get his recommendation array 
exports.getFirstRecommendation = async (nationalId) => {
    try {
        const recommendation = await fetch(`https://ml-api-giqx.onrender.com/nationalId=${nationalId}`);
        const data = await recommendation.json();
        if (recommendation.status !== 200) {
            return {
                success: false,
                statusCode: 400,
                message: "could not get partner recommendation for you !",
                error: data.message
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
        }
    }
    catch (err) {
        console.log(err.message);
        return {
            statusCode: 500,
            message: "error",
            error: err.message
        }
    }
};

// whenever the user ask for partner recommendation we will get his recommendation array
exports.getUserRecommendations = async (nationalId, page, select) => {
    try {
        const limit = 5;
        const skip = (page - 1) * limit;
        let recommendation = await recommendationModel.findOne({ nationalId: nationalId }).select('userRecommendations');
        recommendation = recommendation.userRecommendations.map(user => user.nationalId);
        const users = await userModel.find({ nationalId: { $in: recommendation }, isAvailable: true }).select(select);
        if (users.length === 0) {
            return {
                success : true,
                hasRecommendation: false,
                statusCode: 200,
                message: "there is no recommendations yet !",
            }
        }
        return {
            success : true,
            hasRecommendation: true,
            statusCode: 200,
            message: "success",
            totalNumOfItems: users.length,
            totalPages: Math.ceil(users.length / limit),
            currentPage: page,
            data: users.slice(skip, skip + limit)
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

// replicate data for ML model ( recommendation collection )
exports.replicateDataForModels = async (data) => {
    try {
        let result = await recommendationModel.findOneAndUpdate({ nationalId: data.nationalId }, data, { upsert: true, new: true });
        if (!result) {
            return {
                success: false,
                statusCode: 417,
                message: "could not replicate data for models !"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success",
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

// update data for ML model ( update rate when user dismatch in recommendation collection )
exports.updateData = async (filter, update) => {
    try {
        const result = await recommendationModel.updateOne(filter, update);
        if (!result) {
            return {
                success: false,
                statusCode: 417,
                message: "could not update data !"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success",
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};