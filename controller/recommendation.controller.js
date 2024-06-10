const recommendationRepo = require('../models/recommendation/recommendation.repo');
const userRepo = require('../models/user/user.repo');

// get recommendation array for user ( patch recommendation )
exports.getPartnerRecommendation = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const nationalId = req.user.nationalId;
        const select = '-password -partnerRequests -notifications -isVerified -numOfReports -deviceTokens -history -__v';
        const populate = { path: 'user', select: 'partnerId' };
        const result = await recommendationRepo.getUserRecommendations(nationalId, page, select, populate);
        if (!result.success || !result.hasRecommendation) {
            return res.status(result.statusCode).json({
                message: result.message,
            });
        }
        return res.status(result.statusCode).json({
            message: result.message,
            totalNumOfItems: result.totalNumOfItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
            data: result.data
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get your partner recommendations !",
            error: "Unexpected Error !"
        });
    };
};

// submit ML model data and get online recommendation for new users
exports.submitUserPrefers = async (req, res) => {
    try {
        const userData = req.body;
        const nationalId = req.user.nationalId;
        const userId = req.user.id
        userData['nationalId'] = nationalId;
        userData['userId'] = userId;
        let replicateDataPromise = recommendationRepo.replicateDataForModels(userData);
        let getRecommendationPromise = recommendationRepo.getFirstRecommendation(nationalId);
        const result = await Promise.all([replicateDataPromise, getRecommendationPromise]);
        if (!result[0].success || !result[1].success) {
            return res.status(417).json({
                message: "error",
                error: "error submitting user prefers"
            });
        }
        let updateUser = await userRepo.updateUser({ nationalId: nationalId }, { getUserPrefers: false, profileDetails: result[0].data._id });
        delete updateUser.data;
        return res.status(updateUser.statusCode).json(updateUser);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't add your preferences !",
            error: "Unexpected Error !"
        });
    };
};

// submit new data to ML model get online recommendation for new interests 
exports.editUserPrefers = async (req, res) => {
    try {
        const userData = req.body;
        const nationalId = req.user.nationalId;
        userData['nationalId'] = nationalId;
        let replicateDataPromise = recommendationRepo.replicateDataForModels(userData);
        let getRecommendationPromise = recommendationRepo.getFirstRecommendation(nationalId);
        const result = await Promise.all([replicateDataPromise, getRecommendationPromise]);
        if (!result[0].success || !result[1].success) {
            return res.status(417).json({
                message: "error",
                error: "error updating user prefers"
            });
        }
        return res.status(201).json({ message: "success" });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't edit your preferences !",
            error: "Unexpected Error !"
        });
    };
};