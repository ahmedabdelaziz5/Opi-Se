const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
    firstPartnerId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    secondPartnerId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    firstNationalId: { type: String, required: true, ref: 'user' },
    secondNationalId: { type: String, required: true, ref: 'user' },
    matchId: { type: String, required: true, },
    matchDate: { type: Date, required: true, default: Date.now() },
    chat: { type: mongoose.Types.ObjectId, ref: 'chat' },
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