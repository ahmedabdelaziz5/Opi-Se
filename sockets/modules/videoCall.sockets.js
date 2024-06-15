// events related to voice/video call module

// event is used to call user
exports.callUser = (socket, callData, ack) => {
    try {
        socket.to(callData.userToCall).emit("callUser", callData);
        ack({
            success: true,
            message: `user called successfully !`,
        })
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while calling user !`,
        })
    }

};

// event is used to answer call
exports.answerCall = (socket, callData, ack) => {
    try {
        socket.to(callData.to).emit("callAccepted", callData);
        ack({
            success: true,
            message: `call answered successfully !`,
        })
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while answering call !`,
        })
    }

};

// event is used to end video call
exports.disconnectCall = (socket, callData, ack) => {
    try {
        const roomId = socket.handshake.query.roomId;
        socket.to(roomId).emit("callEnded", callData);
        ack({
            success: true,
            message: `call ended successfully !`,
        })
    }
    catch (err) {
        console.log("disconnect : " + err.message);
        return ack({
            success: false,
            message: `error while ending video call !`,
        })
    }
};

// event is used to toggle camera
exports.toggleCamera = (socket, callData, ack) => {
    try {
        const roomId = socket.handshake.query.roomId;
        socket.to(roomId).emit("cameraToggled", callData);
        ack({
            success: true,
            message: `user toggled his camera !`,
        });
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while toggling camera !`,
        })
    }

};

// event is used to toggle microphone
exports.toggleMicrophone = (socket, callData, ack) => {
    try {
        const roomId = socket.handshake.query.roomId;
        socket.to(roomId).emit("microphoneToggled", callData);
        ack({
            success: true,
            message: `user toggled his microphone !`,
        });
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while toggling microphone !`,
        })
    }

};