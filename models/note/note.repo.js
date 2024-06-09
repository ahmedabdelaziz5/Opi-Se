const noteModel = require('./note.model');
const mongoose = require('mongoose');

exports.getNotes = async (filter, pagg) => {
    try {
        const skip = (pagg.page - 1) * pagg.limit;
        let notes = noteModel.find(filter).sort({ isPinned: -1, createdAt: -1, updatedAt: -1 }).skip(skip).limit(pagg.limit).lean();
        let itemCount = noteModel.countDocuments(filter);
        const [notesPromise, itemCountPromise] = await Promise.all([notes, itemCount]);
        if (!notesPromise.length) {
            return {
                success: true,
                statusCode: 200,
                message: "No notes yet !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            totalNumOfItems: itemCountPromise,
            totalPages: Math.ceil(itemCountPromise / pagg.limit),
            currentPage: pagg.page,
            data: notesPromise,
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.createNote = async (data) => {
    try {
        const noteId = new mongoose.Types.ObjectId();
        data["_id"] = noteId;
        const note = await noteModel.create(data);
        if (!note) {
            return {
                success: false,
                statusCode: 400,
                message: "Unable to create note"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "Note created successfully",
            data: note
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.updateNote = async (filter, edit, option) => {
    try {
        edit["updatedAt"] = Date.now();
        const result = await noteModel.findOneAndUpdate(filter, edit, option);
        if (!result) {
            return {
                success: false,
                statusCode: 400,
                message: "there is no such note !"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success",
            data: result
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.deleteNote = async (filter) => {
    try {
        const result = await noteModel.findOneAndDelete(filter).lean();
        if (!result) {
            return {
                success: false,
                statusCode: 401,
                message: "Not Authorized !"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success",
            data: result
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};
