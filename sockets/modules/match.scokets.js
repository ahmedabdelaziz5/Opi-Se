// events related to match module

exports.notifyUserRoom = async (socket, data, ack) => {
    const roomId = socket.handshake.query.roomId;
    socket.to(roomId).emit('showNotificationMark', { notification: true });
    ack({
        success: true,
        message: `user was notified successfully !`,
    })
}