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
            success: false,
            message: "Could't get all notes from trash !",
            error: "Unexpected Error !"
        });
    };
};

exports.deleteNoteFromTrash = async (req, res) => {
    try {
        const { matchId, noteId } = req.query.matchId;
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
            success: false,
            message: "Could't delete note from trash !",
            error: "Unexpected Error !"
        });
    };
};

exports.flushTrash = async (req, res) => {
    try {
        const { matchId } = req.query;
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
            success: false,
            message: "Could't delete trash list !",
            error: "Unexpected Error !"
        });
    };
};