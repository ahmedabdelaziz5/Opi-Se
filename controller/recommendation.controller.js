const recommendationRepo = require('../models/recommendation/recomendation.repo');

exports.getPartnerRecommendation = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const nationalId = req.user.nationalId;
        const recommendationArray = await recommendationRepo.getUserRecommendations(nationalId, page, '-history -deviceTokens -partnerRequests -password');
        return res.status(recommendationArray.statusCode).json({
            message : recommendationArray.message,
            totalNumOfItems: recommendationArray.totalNumOfItems,
            totalPages: recommendationArray.totalPages,
            currentPage: recommendationArray.currentPage,
            data : recommendationArray.data
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

// demo 
exports.getOnlineRecommendation = async (req, res) => {
    try {
        const nationalId = req.user.nationalId;
        const page = req.query.page || 1;
        const recommendation = await recommendationRepo.getFirstRecommendation(nationalId);
        if(!recommendation.success){
            return res.status(recommendation.statusCode).json({
                message : recommendation.message,
            })
        }
        let data = await recommendationRepo.getUserRecommendations(nationalId, page, '-history -deviceTokens -partnerRequests -password');
        return res.status(data.statusCode).json({
            message : data.message
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

exports.submitUserPrefers = async (req, res) => {
    try {
        const userData = req.body;
        userData['nationalId'] = req.user.nationalId ; 
        let result = await recommendationRepo.replicateDataForModels(userData);
        return res.status(result.statusCode).json({
            message: result.message,
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}