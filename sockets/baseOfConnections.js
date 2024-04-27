// sockets logic 
const userModule = require('./modules/user.sockets');
const matchModule = require('./modules/match.scokets');
const videoCallModule = require('./modules/videoCall.sockets');
const chatModule = require('./modules/chat.scokets');
const noteModule = require('./modules/note.sockets');
const taskModule = require('./modules/task.sockets');

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
        socket.on("disconnectCall", (data, ack) => videoCallModule.disconnectCall(socket, data, ack));
        socket.on("toggleCamera", (data, ack) => videoCallModule.toggleCamera(socket, data, ack));
        socket.on("toggleMicrophone", (data, ack) => videoCallModule.toggleMicrophone(socket, data, ack));

        // chat Module events
        socket.on("sendMessage", (data, ack) => chatModule.sendMessage(socket, data, ack));
        socket.on("deleteMessage", (data, ack) => chatModule.deleteMessage(socket, data, ack));
        socket.on("selectFromPoll", (data, ack) => chatModule.selectFromPoll(socket, data, ack));
        socket.on("endChatSession", (data, ack) => chatModule.endChatSession(socket, data, ack));
        socket.on("startChatSession", (data, ack) => chatModule.startChatSession(socket, data, ack));
        socket.on("uploadChatMedia", (data, ack) => chatModule.uploadChatMedia(socket, data, ack));
        socket.on("replyToSessionRequest", (data, ack) => chatModule.replyToSessionRequest(socket, data, ack));

        // note Module events
        socket.on("addNote", (data, ack) => noteModule.addNote(socket, data, ack));
        socket.on("deleteNote", (data, ack) => noteModule.deleteNote(socket, data, ack));
        socket.on("updateNote", (data, ack) => noteModule.updateNote(socket, data, ack));
        socket.on("pinNote", (data, ack) => noteModule.pinNote(socket, data, ack));
        socket.on("restorNote", (data, ack) => noteModule.restorNote(socket, data, ack));

        // task Module events
        socket.on("addTask", (data, ack) => taskModule.addTask(socket, data, ack));
        socket.on("updateTask", (data, ack) => taskModule.updateTask(socket, data, ack));
        socket.on("deleteTask", (data, ack) => taskModule.deleteTask(socket, data, ack));
        socket.on("deleteAllTasks", (data, ack) => taskModule.deleteAllTasks(socket, data, ack));
    });
};