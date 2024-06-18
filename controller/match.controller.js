const mongoose = require('mongoose');
const { setUpMails } = require('../helpers/sendEmail');
const userRepo = require("../models/user/user.repo");
const myEventEmitter = require('../helpers/eventEmitter');
const { sendNotification } = require('../services/sendPushNotification');
const relationshipRepo = require("../models/relationship/relationship.repo");
const { writeInCache, deleteFromCache } = require('../services/checkCachedRelations');
const recommendationRepo = require("../models/recommendation/recommendation.repo");

// function that allows user to get his partner requests 
exports.getMatchRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await userRepo.isExist(
            { _id: userId },
            'partnerRequests',
            { path: 'partnerRequests', select: '_id userName email gender profileImage' },
        );
        if (requests.success) {
            requests.statusCode = 200;
            requests.message = "success";
        }
        return res.status(requests.statusCode).json(requests);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get partner requests !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to search for a specific partner with his partnerId 
exports.searchForSpecificPartner = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await userRepo.isExist(
            { _id: req.user.id },
            'sentRequests partnerRequests',
            { path: 'partnerRequests', select: '_id' },
        )
        if (!user.success) return res.status(user.statusCode).json(user);
        const alreadyRequestedHim = user.data.sentRequests.includes(userId);
        if (!alreadyRequestedHim) {
            var alreadyRequestedMe = user.data.partnerRequests.find(ele => toString(ele._id) === toString(userId));
            alreadyRequestedMe !== undefined ? alreadyRequestedMe = true : alreadyRequestedMe = false;
        }
        const select = '-password -partnerRequests -notifications -isVerified -numOfReports -deviceTokens -history';
        const result = await userRepo.isExist(
            { _id: userId },
            select,
            { path: 'profileDetails' }
        );
        if (!result.success) {
            result.message = "partner not found !";
            return res.status(result.statusCode).json(result);
        }
        const profileDetails = result.data.profileDetails;
        result.data.alreadyRequestedHim = alreadyRequestedHim;
        result.data.alreadyRequestedMe = alreadyRequestedMe;
        delete result.data.profileDetails;
        return res.status(200).json({
            message: "success",
            data: result.data,
            profileDetails: profileDetails
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't search for partner !",
            error: "Unexpected Error !"
        });
    }
};

// function that performs the database and push notification logic for sending partner request
exports.sendPartnerRequest = async (req, res) => {
    try {
        const { userId } = req.query;
        if (req.user.id === userId) {
            return res.status(400).json({
                success: false,
                message: "You can't send request to yourself !",
            });
        }
        const isPartner = await userRepo.updateOnly(
            { _id: req.user.id },
            {
                $addToSet: { sentRequests: userId },
                isAvailable: false
            },
        );
        if (!isPartner.success) {
            return res.status(isPartner.statusCode).json(isPartner);
        }
        const updateUserData = await userRepo.updateUser(
            { _id: userId },
            {
                isAvailable: false,
                $push: {
                    notifications: { message: "you have a new partner request check it out !" },
                    partnerRequests: req.user.id
                },
            },
            null,
            'deviceTokens'
        );
        if (!updateUserData.success) {
            updateUserData.message = 'There is no such partner !';
            return res.status(updateUserData.statusCode).json(updateUserData);
        }
        res.status(updateUserData.statusCode).json({
            success: updateUserData.success,
            message: updateUserData.message,
            notifiedPartner: updateUserData.success ? updateUserData.notifiedPartner = userId : null
        });
        await sendNotification(updateUserData.data.deviceTokens, type = "newPartnerRequest");
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't send partner request !",
            error: "Unexpected Error !"
        });
    };
};

// function that performs the database logic and push notification when decline partner request
exports.declineMatchRequest = async (req, res) => {
    try {
        const { id } = req.user;
        const { rejectedUserId, email } = req.body;
        const user = userRepo.updateUser(
            { _id: id },
            {
                isAvailable: true,
                $pull: { partnerRequests: { _id: rejectedUserId } }
            }
        );
        const deliverEmail = setUpMails("rejectionEmail", { email: email });
        const updateUserData = userRepo.updateUser(
            { _id: rejectedUserId },
            {
                isAvailable: true,
                $push: { notifications: { message: "unfortunately, your partner request was rejected, but it's not the end you still can find your another partner :) " } }
            },
            'deviceTokens'
        )
        const result = await Promise.all([deliverEmail, user, updateUserData]);
        if (!result[0].success || !result[1].success || !result[2].success) {
            return res.status(500).json({
                message: "error",
                error: "error when declining partner request"
            });
        }
        res.status(200).json({
            message: "success",
            success: true
        })
        await sendNotification(result[2].data.deviceTokens, type = "rejectMatchRequest");
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't decline match request !",
            error: "Unexpected Error !"
        });
    }
};

// function that performs the database logic and push notification for accepting partner request
exports.acceptMatchRequest = async (req, res) => {
    try {
        const { partner2Id, nationalId } = req.query;
        const partner1Id = req.user.id;
        const matchId = new mongoose.Types.ObjectId();
        const dependantData = await userRepo.getAll({ _id: { $in: [partner1Id, partner2Id] } }, 'deviceTokens partnerRequests');
        if (dependantData.data.length !== 2) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Account not found !",
            });
        }
        const bulkUpdate = userRepo.bulkUpdate([
            {
                updateOne: {
                    filter: { _id: partner1Id },
                    update: {
                        $set: {
                            matchId: matchId,
                            partnerId: partner2Id,
                            isAvailable: false,
                            partnerRequests: [],
                            sentRequests: []
                        }
                    }
                }
            },
            {
                updateOne: {
                    filter: { _id: partner2Id },
                    update: {
                        $set: {
                            matchId: matchId,
                            partnerId: partner1Id,
                            isAvailable: false,
                            partnerRequests: [],
                            sentRequests: []
                        },
                        $push: {
                            notifications: { message: "you have a new partner with a new chance don't miss this !" }
                        }
                    }
                }
            }
        ]);
        const createRelationship = relationshipRepo.createRelationship({
            _id: matchId,
            firstPartnerId: partner1Id,
            secondPartnerId: partner2Id,
            firstNationalId: req.user.nationalId,
            secondNationalId: nationalId,
            matchId: matchId,
            matchDate: Date.now()
        });
        const stringData = JSON.stringify([{ _id: partner1Id }, { _id: partner2Id }]);
        const cacheRelationship = writeInCache(`${matchId}`, stringData);
        const result = await Promise.all([bulkUpdate, createRelationship, cacheRelationship]);
        if (!result[0].success || !result[1].success || !result[2].success) {
            return res.status(500).json({
                message: "error",
                error: "error when accepting partner request"
            });
        }
        res.status(200).json({
            message: "success",
            success: true,
            acceptedPartner: partner1Id,
            notifiedPartner: partner2Id,
            matchId: matchId
        });
        const receiver = dependantData.data.find(ele => toString(ele._id) === toString(partner2Id));
        sendNotification(receiver.deviceTokens, type = "acceptMatchRequest");
        myEventEmitter.emit('processDeclinedRequests', [...dependantData.data[0].partnerRequests, ...dependantData.data[0].partnerRequests]);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't accept partner request !",
            error: "Unexpected Error !"
        });
    };
};

// function that performs the database logic for dismatch with partner 
exports.disMatchWithPartner = async (req, res) => {
    try {
        const rate = req.body;
        let { matchId } = req.query;
        let relationship = await relationshipRepo.isExist({ matchId: matchId });
        if (!relationship.success) {
            return res.status(relationship.statusCode).json({
                message: relationship.error
            });
        }
        const updateUsersProgress = userRepo.updateManyUsers(
            { _id: { $in: [relationship.data.firstPartnerId, relationship.data.secondPartnerId] } },
            {
                isAvailable: true, matchId: null, partnerId: null, $inc: { points: relationship.data.progressPoints }, history: { matchId: matchId },
                $push: { notifications: { message: "it seems like your partner wasn't your best match, but the chance is not over yet. you can look for a better partner" } }
            }
        )
        const updateRate = recommendationRepo.updateData({ nationalId: req.user.nationalId }, { $push: { partnerRate: rate } });
        const deleteCachedRelationship = deleteFromCache(matchId);
        const result = await Promise.all([updateUsersProgress, updateRate, deleteCachedRelationship]);
        if (!result[0].success || !result[1].success, !result[2].success) {
            return res.status(500).json({
                message: "error",
                error: "error when dismatch with partner"
            })
        }
        return res.status(200).json({
            message: "success"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't dismatch with partner !",
            error: "Unexpected Error !"
        });
    };
};