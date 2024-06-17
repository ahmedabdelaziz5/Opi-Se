// sockets controllers  
const userModule = require('./modules/user.sockets');
const matchModule = require('./modules/match.sockets');
const videoCallModule = require('./modules/videoCall.sockets');
const chatModule = require('./modules/chat.sockets');
const noteModule = require('./modules/note.sockets');
const taskModule = require('./modules/task.sockets');

// validation middlewares
const { validateEvent } = require('./validation/validator');
const chatValidation = require('./validation/chat.validation');
const matchValidation = require('./validation/match.validation');
const noteValidation = require('./validation/note.validation');

//base socket connection with server
exports.establishSocketConnections = (io) => {

    io.on('connection', (socket) => {

        // emit socket id to client
        socket.emit("mySocket", socket.id);

        // user Module events
        socket.on('joinUserRoom', (data, ack) => userModule.joinUserRoom(socket, data, ack));
        socket.on('notifyUserRoom', (data, ack) => userModule.notifyUserRoom(socket, data, ack));

        // match Module events
        socket.on('acceptPartnerRequest',
            async (data, ack) => {
                const validationResult = validateEvent(matchValidation.acceptPartnerRequestValid, data);
                if (!validationResult.success) {
                    return ack({
                        success: false,
                        error: "validation error",
                        message: validationResult.message,
                    });
                }
                await matchModule.acceptPartnerRequest(socket, data, ack);
            }
        );

        socket.on('disMatch',
            (data, ack) => matchModule.disMatch(io, socket, data, ack)
        );
        socket.on('joinMatchRoom',
            (data, ack) => matchModule.joinMatchRoom(socket, data, ack)
        );
        socket.on('sendDataToMatchRoom',
            (data, ack) => matchModule.sendDataToMatchRoom(socket, data, ack)
        );

        // videoCall Module events
        socket.on("callUser",
            (data, ack) => videoCallModule.callUser(socket, data, ack)
        );
        socket.on("answerCall",
            (data, ack) => videoCallModule.answerCall(socket, data, ack)
        );
        socket.on("disconnectCall",
            (data, ack) => videoCallModule.disconnectCall(socket, data, ack)
        );
        socket.on("toggleCamera",
            (data, ack) => videoCallModule.toggleCamera(socket, data, ack)
        );
        socket.on("toggleMicrophone",
            (data, ack) => videoCallModule.toggleMicrophone(socket, data, ack)
        );

        // chat Module events
        socket.on("sendMessage",
            async (data, ack) => {
                const validationResult = validateEvent(chatValidation.sendMessageValid, data);
                if (!validationResult.success) {
                    return ack({
                        success: false,
                        error: "validation error",
                        message: validationResult.message,
                    });
                }
                await chatModule.sendMessage(socket, data, ack);
            }
        );
        socket.on("deleteMessage",
            async (data, ack) => {
                const validationResult = validateEvent(chatValidation.deleteMessageValid, data);
                if (!validationResult.success) {
                    return ack({
                        success: false,
                        error: "validation error",
                        message: validationResult,
                    });
                }
                await chatModule.deleteMessage(socket, data, ack);
            }
        );
        socket.on("selectFromPoll",
            (data, ack) => chatModule.selectFromPoll(socket, data, ack)
        );
        socket.on("endChatSession",
            async (data, ack) => {
                const validationResult = validateEvent(chatValidation.endChatSessionValid, data)
                if (!validationResult.success) {
                    return ack({
                        success: false,
                        error: "validation error",
                        message: validationResult.message,
                    });
                }
                await chatModule.endChatSession(socket, data, ack);
            }
        );
        socket.on("startChatSession",
            async (data, ack) => {
                const validationResult = validateEvent(chatValidation.startChatSessionValid, data);
                if (!validationResult.success) {
                    return ack({
                        success: false,
                        error: "validation error",
                        message: validationResult.message,
                    });
                }
                await chatModule.startChatSession(socket, data, ack);
            }
        );
        socket.on("uploadChatMedia",
            async (data, ack) => {
                const validationResult = validateEvent(chatValidation.uploadChatMediaValid, data);
                if (!validationResult.success) {
                    return ack({
                        success: false,
                        error: "validation error",
                        message: validationResult.message,
                    });
                }
                await chatModule.uploadChatMedia(socket, data, ack);
            }
        );
        socket.on("replyToSessionRequest",
            async (data, ack) => {
                const validationResult = validateEvent(chatValidation.replyToSessionRequestValid, data)
                if (!validationResult.success) {
                    return ack({
                        success: false,
                        error: "validation error",
                        message: validationResult.message,
                    });
                }
                await chatModule.replyToSessionRequest(socket, data, ack);
            }
        );

        // note Module events
        socket.on("addNote",
            (data, ack) => noteModule.addNote(socket, data, ack)
        );
        socket.on("deleteNote",
            (data, ack) => noteModule.deleteNote(socket, data, ack)
        );
        socket.on("updateNote",
            (data, ack) => noteModule.updateNote(socket, data, ack)
        );
        socket.on("pinNote",
            (data, ack) => noteModule.pinNote(socket, data, ack)
        );
        socket.on("restoreNote",
            (data, ack) => noteModule.restoreNote(socket, data, ack)
        );

        // task Module events
        socket.on("addTask",
            (data, ack) => taskModule.addTask(socket, data, ack)
        );
        socket.on("updateTask",
            (data, ack) => taskModule.updateTask(socket, data, ack)
        );
        socket.on("deleteTask",
            (data, ack) => taskModule.deleteTask(socket, data, ack)
        );
        socket.on("deleteAllTasks",
            (data, ack) => taskModule.deleteAllTasks(socket, data, ack)
        );

    });
};