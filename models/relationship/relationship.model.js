const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
    firstPartnerId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    secondPartnerId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    firstNationalId: { type: String, required: true, ref: 'user' },
    secondNationalId: { type: String, required: true, ref: 'user' },
    matchId: { type: String, required: true, },
    matchDate: { type: Date, required: true, default: Date.now() },
    chat: [{
        mesageSender: { type: mongoose.Types.ObjectId, required: true },
        messageType: { type: String, required: true, default: "text" },
        messageContent: { type: String, },
        messageQuestion: { type: String, },
        messageOptions: [{
            optionNumber: { type: Number, required: true },
            optionContent: { type: String, required: true },
            isChoosen: { type: Boolean, default: false },
        }],
    }],
    progressPoints: { type: Number, required: true, default: 0 },
    matchBadges: [{ type: String, required: true, default: "badge.png" }],
    sessionsHistory: [{
        sessionDate: { type: Date, required: true, default: Date.now() },
        sessionDuration: { type: Number, required: true, default: 0 },
        sessionTopics: { type: String, required: true, default: "General" },
        sessionPoints: { type: Number, required: true, default: 0 },
    }]
});


const relationshipModel = mongoose.model('relationship', relationshipSchema);

module.exports = relationshipModel;