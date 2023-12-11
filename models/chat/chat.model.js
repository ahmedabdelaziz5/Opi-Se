const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    matchId: { type: String, required: true, ref: 'relationship' },
    chat: [{
        messageSender: { type: String, required: true },
        messageType: { type: String, required: true, default: "text" }, // text, image, poll
        messageContent: { type: String, },
        pollQuestion: { type: String, },
        pollAnswers: {
            type: [{
                optionNumber: { type: Number, required: true },
                optionContent: { type: String, required: true },
                isChoosen: { type: Boolean, default: false },
            }],
            default: undefined 
        },
    }],
    chatMedia: [{
        mediaUrl: { type: String, required: true },
    }],
    chatLinks: [{
        linkUrl: { type: String, required: true },
    }],
});


const chatModel = mongoose.model('chat', chatSchema);

module.exports = chatModel;