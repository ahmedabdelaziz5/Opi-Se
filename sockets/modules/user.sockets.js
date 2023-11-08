// events related to user module 

exports.joinUserRoom = async (socket, data, ack) => {
    const userId = socket.handshake.query.userId;
    socket.join(userId);
    ack({
        success: true,
        message: `user has joined his room successfully !`,
    })
    console.log('event : joinUserRoom cmopleted !');
}

