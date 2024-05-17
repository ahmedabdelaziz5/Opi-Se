const trashRepo = require('../models/trash/trash.repo');

exports.getAllTrashNotes = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const matchId = req.query.matchId;
        const result = await trashRepo.getAllTrash({ matchId: matchId }, { page, limit });
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
            });
        }
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    };
};

exports.deleteNoteFromTrash = async (req, res) => {
    try {
        const matchId = req.query.matchId;
        const noteId = req.query.noteId;
        const result = await trashRepo.deleteFromTrash({ matchId: matchId, _id: noteId });
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
            });
        }
        return res.status(200).json({
            message: "success"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    };
};

exports.flushTrash = async (req, res) => {
    try {
        const matchId = req.query.matchId;
        const result = await trashRepo.deleteAllTrash({ matchId: matchId });
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
            });
        }
        return res.status(200).json({
            message: "success"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    };
};