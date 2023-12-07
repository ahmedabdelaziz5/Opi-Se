const recommendationRepo = require('../models/recommendation/recomendation.repo');
const userRepo = require('../models/user/user.repo');

// get recommendation array for user ( patch recomendation )
exports.getPartnerRecommendation = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const nationalId = req.user.nationalId;
        const result = await recommendationRepo.getUserRecommendations(nationalId, page, '-history -deviceTokens -partnerRequests -password');
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message,
                error: result.error.message
            })
        }
        if (!result.hasRecommendation) {
            return res.status(result.statusCode).json({
                message: result.message,
            })
        }
        return res.status(result.statusCode).json({
            message: result.message,
            totalNumOfItems: result.totalNumOfItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
            data: result.data
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

// submit ML model data and get online recommendation for new users
exports.submitUserPrefers = async (req, res) => {
    try {
        const userData = req.body;
        const nationalId = req.user.nationalId;
        userData['nationalId'] = nationalId;
        let replicatDataPromis = recommendationRepo.replicateDataForModels(userData);
        let getRecommendationPromis = recommendationRepo.getFirstRecommendation(nationalId);
        let updateUserPromis = userRepo.updateUser({ nationalId: nationalId }, { getUserPrefers: false });
        const result = await Promise.all([replicatDataPromis, getRecommendationPromis, updateUserPromis]);
        console.log(result);
        if (!result[0].success || !result[1].success || !result[2].success) {
            return res.status(417).json({
                message: "error",
                error: result[0].error.message || result[1].error.message || result[2].error.message
            })
        }
        return res.status(201).json({
            message: "success"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};
