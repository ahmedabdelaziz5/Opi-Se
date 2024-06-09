// events related to note module 
const { checkSocketAuth } = require('../Auth.js');

exports.addNote = async (socket, data, ack) => {
    try {
        const { token, matchId } = socket.handshake.query;
        const isAuth = await checkSocketAuth(token, matchId);
        if (!isAuth.success) {
            return ack({
                success: false,
                message: "Not Authorized !"
            });
        }
        socket.broadcast.to(matchId).emit("getNote", { data: data });
        return ack({
            success: true,
            message: `note was added successfully !`,
            data: data
        })
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while adding note !`,
        })
    }
};

exports.updateNote = async (socket, data, ack) => {
    try {
        const { token, matchId } = socket.handshake.query;
        const isAuth = await checkSocketAuth(token, matchId);
        if (!isAuth.success) {
            return ack({
                success: false,
                message: "Invalid Token !"
            });
        }
        socket.broadcast.to(matchId).emit("getUpdatedNote", { data: data });
        return ack({
            success: true,
            message: `note was updated successfully !`,
            data: data
        })
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while updating note !`,
        })
    }
};

exports.pinNote = async (socket, data, ack) => {
    try {
        const { token, matchId } = socket.handshake.query;
        const isAuth = await checkSocketAuth(token, matchId);
        if (!isAuth.success) {
            return ack({
                success: false,
                message: "Not Authorized !"
            })
        }
        socket.broadcast.to(matchId).emit("notePinned", { data: data });
        return ack({
            success: true,
            message: `note was pinned successfully !`,
            data: data
        })
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while pinning note !`,
        })
    }
};

exports.deleteNote = async (socket, data, ack) => {
    try {
        const { token, matchId } = socket.handshake.query;
        const isAuth = await checkSocketAuth(token, matchId);
        if (!isAuth.success) {
            return ack({
                success: false,
                message: "Not Authorized !"
            })
        }
        socket.broadcast.to(matchId).emit("noteDeleted", { data: data });
        return ack({
            success: true,
            message: `note was deleted successfully !`,
            data: data
        })
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while deleting note !`,
        })
    }
};

exports.restoreNote = async (socket, data, ack) => {
    try {
        const { token, matchId } = socket.handshake.query;
        const isAuth = await checkSocketAuth(token, matchId);
        if (!isAuth.success) {
            return ack({
                success: false,
                message: "Not Authorized !"
            })
        }
        socket.broadcast.to(matchId).emit("noteRestored", { data: data });
        return ack({
            success: true,
            message: `note was restored successfully !`,
            data: data
        })
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while restoring note !`,
        })
    }
};