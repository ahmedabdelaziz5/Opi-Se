const mongoose = require('mongoose');
const userRepo = require("../models/user/user.repo");
const { sendNotification } = require('../services/sendPushNotification');
const { recommendationModel } = require("../recommentations/getPartnerRecommendation");

exports.getMatchRequest = async (req, res) => {
    try {

        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }

        const requests = await userRepo.isExist({ _id: userId }, 'partnerRequests');

        return res.status(requests.statusCode).json({
            message: requests.message,
            data: requests.data
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}

exports.sendPartnerRequest = async (req, res) => {
    try {

        const { userId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }

        newRequest = {
            partnerId: req.user.id,
            partnerUserName: req.user.userName
        };

        const deviceTokens = await userRepo.updateUser({ _id: userId }, { $push: { partnerRequests: newRequest }, isAvailable: false });

        if (!deviceTokens.success) {
            return res.status(deviceTokens.statusCode).json({
                message: deviceTokens.message
            })
        }

        const notification = await sendNotification(deviceTokens.data.deviceTokens);

        return res.status(notification.statusCode).json({
            message: notification.message
        });

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    };
}

// demo 
exports.getPartnerRecommendation = async (req, res) => {
    try {
        const nationalId = req.user.nationalId;
        const recommendation = await recommendationModel(nationalId)
        res.status(recommendation.statusCode).json({
            message : recommendation.message,
            data : recommendation.data
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}

exports.respondToMatchRequest = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}

exports.disMatchWithPartner = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}

exports.searchForSpecificPartner = async (req, res) => {
    try {

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}
