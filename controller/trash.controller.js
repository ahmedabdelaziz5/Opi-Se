const mongoose = require('mongoose');
const trashRepo = require('../models/trash/trash.repo');

exports.getAllTrashNotes = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const matchId = req.query.matchId;
        const result = await noteRepo.getNotes({ matchId: matchId }, { page, limit });
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
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

exports.deleteNoteFromTrash = async (req, res) => {
    try {
        const noteData = req.body;
        noteData["userId"] = req.user.id;
        noteData["matchId"] = req.query.matchId;
        const result = await noteRepo.createNote(noteData);
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
            })
        }
        return res.status(201).json({
            message: "success",
            data: noteData
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

exports.flushTrash = async (req, res) => {
    try {
        const noteData = req.body;
        noteData["userId"] = req.user.id;
        noteData["matchId"] = req.query.matchId;
        const result = await noteRepo.createNote(noteData);
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
            })
        }
        return res.status(201).json({
            message: "success",
            data: noteData
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};
