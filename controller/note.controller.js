const noteRepo = require('../models/note/note.repo');
const trashRepo = require('../models/trash/trash.repo');

exports.getAllNotes = async (req, res) => {
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
            success: false,
            message: "Could't get your notes !",
            error: "Unexpected Error !"
        });
    }
};

exports.addNote = async (req, res) => {
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
            success: false,
            message: "Could't add this note !",
            error: "Unexpected Error !"
        });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const noteData = req.body;
        const noteId = req.query.noteId;
        const matchId = req.query.matchId;
        const userId = req.user.id;
        const result = await noteRepo.updateNote({ matchId, userId, _id: noteId }, noteData, { new: true });
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
            })
        }
        return res.status(201).json({
            message: "success",
            data: result.data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't update this note !",
            error: "Unexpected Error !"
        });
    }
};

exports.pinNote = async (req, res) => {
    try {
        const { isPinned } = req.body;
        const { noteId, matchId } = req.query.noteId;
        const result = await noteRepo.updateNote(
            { matchId, _id: noteId },
            { isPinned: isPinned },
            { new: true }
        );
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message
            })
        }
        return res.status(201).json({
            message: "success",
            data: result.data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't pin this note !",
            error: "Unexpected Error !"
        });
    };
};

exports.deleteNote = async (req, res) => {
    try {
        const { noteId, matchId } = req.query.noteId;
        const note = await noteRepo.deleteNote({ _id: noteId, matchId });
        if (!note.success) {
            return res.status(note.statusCode).json({
                message: note.message
            })
        }
        const moveToTrash = await trashRepo.moveNoteToTrash(note.data);
        return res.status(moveToTrash.statusCode).json({
            message: moveToTrash.message
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't delete this note !",
            error: "Unexpected Error !"
        });
    }
};

exports.restoreNote = async (req, res) => {
    try {
        const { noteId, matchId } = req.query.noteId;
        const note = await trashRepo.restoreFromTrash({ _id: noteId, matchId });
        if (!note.success) {
            return res.status(note.statusCode).json({
                message: note.message
            })
        }
        const restore = await noteRepo.createNote(note.data);
        if (!restore.success) {
            return res.status(restore.statusCode).json({
                message: restore.message
            })
        }
        return res.status(200).json({
            message: "success",
            data: note.data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't restore this note !",
            error: "Unexpected Error !"
        });
    }
};