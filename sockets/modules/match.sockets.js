// events related to match module

// event is used to join the user to match room , emit another event to the partner to join the match room, notify the user and update friends list in the client side
exports.acceptPartnerRequest = async (socket, data, ack) => {
    try {
        const { notifiedPartner, matchId } = data;
        socket.join(matchId);
        socket.to(notifiedPartner).emit('matchRequestApproved', data);
        return ack({
            success: true,
            message: `partner request was accepted successfully !`,
        });
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while accepting partner request !`,
        })
    }
};

// event is used to close chat and update friends list when dismatch 
exports.disMatch = async (io, socket, data, ack) => {
    try {
        const matchId = socket.handshake.query.matchId;
        io.to(matchId).emit('leaveRoom', { closeChat: true, updateFriendsList: true });
        io.sockets.adapter.rooms.delete(matchId);
        ack({
            success: true,
            message: `partners dismactched successfully !`,
        })
    }
    catch (err) {
        console.log(err.message);
        return ack({
            success: false,
            message: `error while dismatching partners !`,
        })
    }
};

// event is used to join the new match room after accepting partner request
exports.joinMatchRoom = async (socket, data, ack) => {
    try {
        const matchId = socket.handshake.query.matchId;
        socket.join(matchId);
        ack({
            success: true,
            message: `user has joined match room successfully !`,
        })
    }
    catch (err) {
        console.log(err.message);
        ack({
            success: false,
            message: `error while joining match room !`,
        })
    }
};

// event is used to test ( send data to a specific room )
exports.sendDataToMatchRoom = async (socket, data, ack) => {
    try {
        socket.to(data.matchId).emit('listenToRoomData', data);
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while accepting partner request !`,
        })
    }
};