const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    matchId: { type: mongoose.Types.ObjectId, required: true, ref: 'relationship' },
    chat: [{
        messageSender: { type: String, required: true },
        messageType: { type: String, required: true, default: "text" }, // text, poll
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
        sentAt: { type: Date, required: true, default: Date.now },
    }],
    chatLinks: [{
        linkUrl: { type: String, required: true },
    }],
});


const chatModel = mongoose.model('chat', chatSchema);

module.exports = chatModel;