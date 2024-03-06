const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    matchId: { type: mongoose.Types.ObjectId, required: true, ref: 'relationship' },
    chat: [{
        messageSender: { type: String, required: true },
        messageType: { type: String, required: true, default: "text" }, // text, poll, mediaLink
        messageContent: { type: String, },
        pollQuestion: { type: String, },
        pollAnswers: [{
            optionNumber: { type: Number, required: true },
            optionContent: { type: String, required: true },
            optionVotes: { type: Number, default: 0 }, // number of people who voted for this option
            optionSelectors: [{ type: mongoose.Types.ObjectId }], // users who selected this option
        }],
        mediaUrl: { type: String, },
        sentAt: { type: Date, required: true, default: Date.now },
    }],
    chatMedia: [{
        messageSender: { type: mongoose.Types.ObjectId, required: true },
        mediaUrl: { type: String, required: true },
        sentAt: { type: Date, required: true, default: Date.now },
    }],
    chatLinks: [{
        messageSender: { type: mongoose.Types.ObjectId, required: true },
        linkUrl: { type: String, required: true },
        sentAt: { type: Date, required: true, default: Date.now },
    }],
});

const chatModel = mongoose.model('chat', chatSchema);

module.exports = chatModel;