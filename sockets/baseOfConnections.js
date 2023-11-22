const userModule = require('./modules/user.sockets');
const matchModule = require('./modules/match.scokets');
const videoCallModule = require('./modules/videoCall.sockets');

//base socket connection with server
exports.establishSocketConnections = (io) => {

    io.on('connection', (socket) => {

        // emit socket id to client
        socket.emit("mySocket", socket.id);

        // user Module events
        socket.on('joinUserRoom', (data, ack) => userModule.joinUserRoom(socket, data, ack));
        socket.on('notifyUserRoom', (data, ack) => userModule.notifyUserRoom(socket, data, ack));

        // match Module events
        socket.on('acceptPartnerRequest', (data, ack) => matchModule.acceptPartnerRequest(socket, data, ack));
        socket.on('disMatch', (data, ack) => matchModule.disMatch(io, socket, data, ack));
        socket.on('joinMatchRoom', (data, ack) => matchModule.joinMatchRoom(socket, data, ack));
        socket.on('sendDataToMatchRoom', (data, ack) => matchModule.sendDataToMatchRoom(socket, data, ack));

        // videoCall Module events
        socket.on("callUser", (data, ack) => videoCallModule.callUser(socket, data, ack));
        socket.on("answerCall", (data, ack) => videoCallModule.answerCall(socket, data, ack));
        socket.on("disconnect", (data, ack) => videoCallModule.disconnect(socket, data, ack));

    });
};