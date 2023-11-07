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
        const { rejectedUserId, email } = req.body;
        if (!mongoose.Types.ObjectId.isValid(rejectedUserId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const user = userRepo.updateUser({ _id: id }, { partnerRequests: [] });
        const deliverEmail = setUpMails("rejectionEmail", { email: email });
        const deviceTokens = userRepo.isExist({ _id: rejectedUserId }, 'deviceTokens');
        const result = await Promise.all([deliverEmail, user, deviceTokens]);
        if (!result[0].success || !result[1].success || !result[2].success) {
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
        const updatePartner1 = userRepo.updateUser({ _id: partner1Id }, { matchId: matchId, partnerId: partner2Id, isAvailable: false });
        const updatePartner2 = userRepo.updateUser({ _id: partner2Id }, { matchId: matchId, partnerId: partner1Id, isAvailable: false });
        const createRelationship = relationshipRepo.createRelationship({
            firstPartnerId: partner1Id,
            secondPartnerId: partner2Id,
            firstNationalId: req.user.nationalId,
            secondNationalId: nationalId,
            matchId: matchId,
            matchDate: Date.now()
        });
        const result = await Promise.all([updatePartner1, updatePartner2, createRelationship]);
        if (!result[0].success || !result[1].success || !result[2].success) {
            return res.status(500).json({
                message: "error",
                error: result[0].error || result[1].error || result[2].error
            })
        }
        const notifyPartner2 = await sendNotification(result[1].data.deviceTokens, type = "acceptMatchRequest");
        return res.status(notifyPartner2.statusCode).json({ message: notifyPartner2.message })
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
        let relationshipId = req.query.relationshipId;
        let relationship = await relationshipRepo.isExist({ matchId: relationshipId });
        if (!relationship.success) {
            return res.status(relationship.statusCode).json({
                message: relationship.message
            })
        }
        const updateUsersProgress = userRepo.updateManyUsers(
            { _id: { $in: [relationship.data.firstPartnerId, relationship.data.secondPartnerId] } },
            { isAvailable: true, matchId: null, partnerId: null, $inc: { points: relationship.data.progressPoints }, history: { matchId: relationshipId } }
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