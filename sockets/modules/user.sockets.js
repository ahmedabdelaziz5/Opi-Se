// events related to user module 

// event to make user his room which has his id 
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
};

