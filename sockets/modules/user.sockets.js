// events related to user module 

exports.joinUserRoom = async (socket, data, ack) => {
    try {
        const userId = socket.handshake.query.userId;
        socket.join(userId);
        ack({
            success: true,
            message: `user has joined his room successfully !`,
        })
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while joining user room !`,
        })
    }
}

