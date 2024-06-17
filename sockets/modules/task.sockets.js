// events related to task module 

exports.addTask = async (socket, data, ack) => {
    try {
        const { matchId } = socket.handshake.query;
        socket.broadcast.to(matchId).emit("getTask", { data: data });
        return ack({
            success: true,
            message: `task was added successfully !`,
            data: data
        });
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while adding task !`,
        });
    };
};

exports.updateTask = async (socket, data, ack) => {
    try {
        const { matchId } = socket.handshake.query;
        socket.broadcast.to(matchId).emit("getUpdatedTask", { data: data });
        return ack({
            success: true,
            message: `task was updated successfully !`,
            data: data
        });
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while updating task !`,
        });
    };
};

exports.deleteTask = async (socket, data, ack) => {
    try {
        const { matchId } = socket.handshake.query;
        socket.broadcast.to(matchId).emit("taskDeleted", { data: data });
        return ack({
            success: true,
            message: `task was deleted successfully !`,
            data: data
        });
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while deleting task !`,
        });
    };
};

exports.deleteAllTasks = async (socket, data, ack) => {
    try {
        const { matchId } = socket.handshake.query;
        socket.broadcast.to(matchId).emit("allTasksDeleted", { data: data });
        return ack({
            success: true,
            message: `tasks was deleted successfully !`,
            data: data
        });
    }
    catch (err) {
        return ack({
            success: false,
            message: `error while deleting tasks !`,
        });
    };
};