const userModule = require('./modules/user.sockets');
const matchModule = require('./modules/match.scokets');


exports.establishSocketConnections = (io) => {
    
    io.on('connection', (socket) => {

        socket.on('joinUserRoom', (data, ack) => userModule.joinUserRoom(socket, data, ack));

        socket.on('notifyUserRoom', (data, ack) => matchModule.notifyUserRoom(socket, data, ack));

        

    });
}
