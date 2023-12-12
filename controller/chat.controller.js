const chatRepo = require('../models/chat/chat.repo');

exports.getPartnerChat = async (req, res) => {
    try {
        const matchId = req.body;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await chatRepo.getChatData(matchId, 'chat', { page, limit });
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
        const matchId = req.body;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await chatRepo.getChatData(matchId, 'chatMedia', { page, limit });
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

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};