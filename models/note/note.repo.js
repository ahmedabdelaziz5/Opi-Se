const noteModel = require('./note.model');

exports.getNotes = async (filter, pagg) => {
    try {
        const skip = (pagg.page - 1) * pagg.limit;
        let notes = noteModel.find(filter).skip(skip).limit(pagg.limit).lean();
        let itemCount = noteModel.countDocuments(filter);
        const [notesPromis, itemCountPromis] = await Promise.all([notes, itemCount]);
        if (!notesPromis.length) {
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
            totalNumOfItems: itemCountPromis,
            totalPages: Math.ceil(itemCountPromis / pagg.limit),
            currentPage: pagg.page,
            data: notesPromis,
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
            message: "Note created successfully"
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
        const result = await noteModel.findOneAndUpdate(filter, edit, option);
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

exports.deleteNote = async (filter) => {
    try {
        const result = await noteModel.findOneAndDelete(filter);
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

exports.moveNoteToTrash = async (data) => {
    try {
        
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};
