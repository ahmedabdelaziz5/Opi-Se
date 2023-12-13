const chatRepo = require('../models/chat/chat.repo');
const mongoose = require('mongoose');
const filterMediaFiles = require('../helpers/filterMediaPaths');
const { uploadManyMediaToCloudinary } = require('../services/uploadImageToCloudinary');

exports.getPartnerChat = async (req, res) => {
    try {
        const { matchId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await chatRepo.getChatData({ matchId }, 'chat', { page, limit });
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
        const { matchId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await chatRepo.getChatData({ matchId }, 'chatMedia', { page, limit });
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
        await chatRepo.updateChat({ matchId }, {
            $push: {
                chatMedia: {
                    $each: result.data.map(item => ({
                        mediaUrl: item,
                    }))
                }
            }
        });
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};