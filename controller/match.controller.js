const userRepo = require("../models/user/user.repo");
const mongoose = require('mongoose');
const { sendNotification } = require('../services/sendPushNotification');

exports.getMatchRequest = async (req, res) => {
    try {

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

exports.getPartnerRecommendation = async (req, res) => {
    try {

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

