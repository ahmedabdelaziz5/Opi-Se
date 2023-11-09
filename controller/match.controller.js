const mongoose = require('mongoose');
const { setUpMails } = require('../helpers/sendEmail');
const userRepo = require("../models/user/user.repo");
const { sendNotification } = require('../services/sendPushNotification');
const relationshipRepo = require("../models/relationship/relationship.repo");
const recommendationRepo = require("../models/recommendation/recomendation.repo");


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
};

exports.searchForSpecificPartner = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const result = await userRepo.isExist({ _id: userId }, '-password');
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: "partner not found !"
            })
        }
        return res.status(200).json({
            message: "success",
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

exports.sendPartnerRequest = async (req, res) => {
    try {

        const { userId, nationalId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }

        const savePartnerNotification = await userRepo.updateUser(
            { _id: userId },
            { $push: { notifications: { message: "you have a new partner request check it out !" } } },
        )

        if (!savePartnerNotification.success) {
            return res.status(partner.statusCode).json({
                message: partner.message
            })
        }

        newRequest = {
            partnerId: req.user.id,
            nationalId: nationalId,
            partnerUserName: req.user.userName
        };

        const deviceTokens = await userRepo.updateUser({ _id: userId }, { $push: { partnerRequests: newRequest }, isAvailable: false });
        if (!deviceTokens.success) {
            return res.status(deviceTokens.statusCode).json({
                message: deviceTokens.message
            })
        }

        const notification = await sendNotification(deviceTokens.data.deviceTokens, type = "newPartnerRequest");

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
};

exports.declineMatchRequest = async (req, res) => {
    try {
        const { id } = req.user;
        const { rejectedUserId, email, requestId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(rejectedUserId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const user = userRepo.updateUser({ _id: id }, { $pull: { partnerRequests: { _id: requestId } } });
        const deliverEmail = setUpMails("rejectionEmail", { email: email });
        const deviceTokens = userRepo.isExist({ _id: rejectedUserId }, 'deviceTokens');
        const savePartnerNotification = userRepo.updateUser(
            { _id: rejectedUserId },
            { $push: { notifications: { message: "unfortunately, your partner request was rejected, but it's not the end you still can find your another partner :) " } } },
        )
        const result = await Promise.all([deliverEmail, user, deviceTokens, savePartnerNotification]);
        if (!result[0].success || !result[1].success || !result[2].success || !result[3].success) {
            return res.status(500).json({
                message: "error",
                error: result[0].error || result[1].error || result[2].error
            })
        }
        const notifyUser = await sendNotification(result[2].data.deviceTokens, type = "rejectMatchRequest");
        return res.status(notifyUser.statusCode).json({
            message: notifyUser.message
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

exports.acceptMatchRequest = async (req, res) => {
    try {
        const { partner2Id, nationalId } = req.query;
        const partner1Id = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(partner2Id)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const matchId = `M${partner1Id}${partner2Id}`
        const updatePartner1 = userRepo.updateUser(
            { _id: partner1Id },
            { matchId: matchId, partnerId: partner2Id, isAvailable: false, partnerRequests: [] }
        );
        const updatePartner2 = userRepo.updateUser(
            { _id: partner2Id },
            { matchId: matchId, partnerId: partner1Id, isAvailable: false, partnerRequests: [], $push: { notifications: { message: "you a new partner with a new chance don't miss this !" } } }
        );
        const createRelationship = relationshipRepo.createRelationship({
            firstPartnerId: partner1Id,
            secondPartnerId: partner2Id,
            firstNationalId: req.user.nationalId,
            secondNationalId: nationalId,
            matchId: matchId,
            matchDate: Date.now()
        });
        const result = await Promise.all([updatePartner1, updatePartner2, createRelationship]);
        console.log(result);
        if (!result[0].success || !result[1].success || !result[2].success) {
            return res.status(500).json({
                message: "error",
                error: result[0].error || result[1].error || result[2].error
            })
        }
        const notifyPartner2 = await sendNotification(result[1].data.deviceTokens, type = "acceptMatchRequest");
        return res.status(notifyPartner2.statusCode).json({
            message: "success",
            acceptedPartner: partner1Id,
            notifiedPartner: partner2Id,
            matchId: matchId
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

exports.disMatchWithPartner = async (req, res) => {
    try {
        const rate = req.body;
        let { matchId } = req.query;
        let relationship = await relationshipRepo.isExist({ matchId: matchId });
        if (!relationship.success) {
            return res.status(relationship.statusCode).json({
                message: relationship.message
            })
        }
        const updateUsersProgress = userRepo.updateManyUsers(
            { _id: { $in: [relationship.data.firstPartnerId, relationship.data.secondPartnerId] } },
            {
                isAvailable: true, matchId: null, partnerId: null, $inc: { points: relationship.data.progressPoints }, history: { matchId: matchId },
                $push: { notifications: { message: "it seems like your partner wasn't your best match, but the chance is not over yet. you can look for a better partner" } }
            }
        )
        const updateRate = recommendationRepo.updateData({ nationalId: req.user.nationalId }, { $push: { partnerRate: rate } })
        const result = await Promise.all([updateUsersProgress, updateRate]);
        if (!result[0].success || !result[1].success) {
            return res.status(500).json({
                message: "error",
                error: result[0].error || result[1].error
            })
        }
        return res.status(200).json({
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