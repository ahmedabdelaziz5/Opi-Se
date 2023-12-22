const trashModel = require('./trash.model');

exports.getAllTrash = async (filter, pagg) => {
    try {
        const skip = (pagg.page - 1) * pagg.limit;
        let notes = trashModel.find(filter).skip(skip).limit(pagg.limit).lean();
        let itemCount = trashModel.countDocuments(filter);
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

exports.moveNoteToTrash = async (data) => {
    try {
        const result = await trashModel.create(data);
        if (!result) {
            return {
                success: false,
                statusCode: 417,
                message: "Unable to create note"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success"
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

exports.deleteFromTrash = async (filter) => {
    try {
        const result = await trashModel.deleteOne(filter);
        if (!result.deletedCount) {
            return {
                success: false,
                statusCode: 417,
                message: "there is no note to delete !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success"
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

exports.deleteAllTrash = async (filter) => {
    try {
        const result = await trashModel.deleteMany(filter);
        if (!result.deletedCount) {
            return {
                success: false,
                statusCode: 417,
                message: "there is no notes to delete !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success"
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

exports.restorFromTrash = async (filter) => {
    try {
        const note = await trashModel.findOneAndDelete(filter).lean();
        if (!note) {
            return {
                success: false,
                statusCode: 401,
                message: "Not Authorized !"
            }
        }
        return{
            success: true,
            statusCode: 200,
            message: "success",
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
}

