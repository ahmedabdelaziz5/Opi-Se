const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    matchId: { type: String, required: true, ref: 'relationship' },
    chat: [{
        mesageSender: { type: mongoose.Types.ObjectId, required: true },
        messageType: { type: String, required: true, default: "text" }, // text, image, poll
        messageContent: { type: String, },
        messageQuestion: { type: String, },
        messageOptions: [{
            optionNumber: { type: Number, required: true },
            optionContent: { type: String, required: true },
            isChoosen: { type: Boolean, default: false },
        }],
        chatMedia: [{
            mediaUrl: { type: String, required: true },
        }]
    }],
});


const chatModel = mongoose.model('chat', chatSchema);

module.exports = chatModel;