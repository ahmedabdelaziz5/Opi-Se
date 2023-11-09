const userModule = require('./modules/user.sockets');
const matchModule = require('./modules/match.scokets');


exports.establishSocketConnections = (io) => {

    io.on('connection', (socket) => {

        socket.on('joinUserRoom', (data, ack) => userModule.joinUserRoom(socket, data, ack));

        socket.on('notifyUserRoom', (data, ack) => matchModule.notifyUserRoom(socket, data, ack));

        socket.on('acceptPartnerRequest', (data, ack) => matchModule.acceptPartnerRequest(socket, data, ack));

        socket.on('disMatch', (data, ack) => matchModule.disMatch(io, socket, data, ack));

        socket.on('joinMatchRoom', (data, ack) => matchModule.joinMatchRoom(socket, data, ack));

        socket.on('sendDataToMatchRoom', (data, ack) => matchModule.sendDataToMatchRoom(socket, data, ack));

    });
}
