// events related to chat module
const chatRepo = require('../../models/chat/chat.repo.js');

// event to send message in chat 
exports.sendMessage = async (socket, data, ack) => {
    try {

    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while sending message !`,
        })
    }
};

exports.deleteMessage = async (socket, data, ack) => {
    try {
        
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while sending message !`,
        })
    }
};

exports.startChatSession = async (socket, data, ack) => {
    try {
        
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while sending message !`,
        })
    }
};

exports.endChatSession = async (socket, data, ack) => {
    try {
        
    }
    catch (err) {
        console.log(err.message)
        return ack({
            success: false,
            message: `error while sending message !`,
        })
    }
};