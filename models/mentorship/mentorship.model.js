const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const mentorshipSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true, ref: 'user' },
    mentorId: { type: ObjectId, required: true, ref: 'mentor' },
    mentorshipId: { type: ObjectId, required: true },
    mentorshipDate: { type: Date, required: true, default: Date.now() },
    chat: { type: ObjectId, ref: 'chat' },
    progressPoints: { type: Number, required: true, default: 0 },
    mentorshipBadges: [{ type: String, required: true, default: "badge.png" }],
    sessionsHistory: [{
        sessionDate: { type: Date, required: true, default: Date.now() },
        sessionStartDate: { type: Date, required: true },
        sessionEndDate: { type: Date, default: Date.now() },
        sessionTopic: { type: String, required: true, default: "General" },
        sessionPoints: { type: Number, required: true, default: 0 },
    }]
});

const mentorshipModel = mongoose.model('mentorship', mentorshipSchema);

module.exports = mentorshipModel;