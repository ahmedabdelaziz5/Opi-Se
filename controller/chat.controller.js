const chatRepo = require('../models/chat/chat.repo');
const mongoose = require('mongoose');
const filterMediaFiles = require('../helpers/filterMediaPaths');
const { uploadManyMediaToCloudinary } = require('../services/uploadImageToCloudinary');

exports.getPartnerChat = async (req, res) => {
    try {
        const { matchId } = req.query;
        if (!mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await chatRepo.getChatData({ matchId }, { path: 'matchId', select: 'firstPartnerId secondPartnerId' }, 'chat', { page, limit }, req.user.id);
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

exports.getChatMedia = async (req, res) => {
    try {
        const { matchId } = req.query;
        if (!mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await chatRepo.getChatData({ matchId }, { path: 'matchId', select: 'firstPartnerId secondPartnerId' }, 'chatMedia', { page, limit }, req.user.id);
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

exports.uploadChatMedia = async (req, res) => {
    try {
        const matchId = req.query.matchId;
        if (!mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(401).json({
                message: "Not Authorized !",
            })
        }
        const files = filterMediaFiles(req.files, 'path');
        const result = await uploadManyMediaToCloudinary(files, "chat media")
        const writeMedia = await chatRepo.updateChat({ matchId }, {
            $push: {
                chatMedia: {
                    $each: result.data.map(item => ({
                        mediaUrl: item,
                    }))
                }
            }
        });
        if (!writeMedia.success) {
            return res.status(500).json({
                message: "could not save media !",
            })
        }
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};