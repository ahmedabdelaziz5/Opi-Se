// events related to user module 

// event to make user his room which has his id 
exports.joinUserRoom = async (socket, data, ack) => {
    try {
        const userId = socket.handshake.query.userId;
        socket.join(userId);
        ack({
            success: true,
            message: `user has joined his room successfully !`,
        });
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while joining user room !`,
        });
    }
};

// event is used to notify user when send/decline partner request in his room
exports.notifyUserRoom = async (socket, data, ack) => {
    try {
        const roomId = socket.handshake.query.roomId;
        socket.to(roomId).emit('showNotificationMark', { notification: true });
        return ack({
            success: true,
            message: `user was notified successfully !`,
        })
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while notifying user !`,
        })
    }
};