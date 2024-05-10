const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const recommendationSchema = new mongoose.Schema({
    user: { type: objectId, required: true, ref: 'user' },
    nationalId: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    specialization: { type: String, required: true },
    partnerRate: [{
        partnerId: { type: String, required: true },
        rate: { type: Number, required: true, default: 0 }
    }],
    userRecommendations: [{
        nationalId: { type: String, required: true },
        score: { type: Number, required: true, default: 0 },
        predScore: { type: Number, required: true, default: 0 },
    }],
    userSkills: [{
        skillName: { type: String, required: true },
        skillRate: { type: Number, required: true, default: 0 }
    }]
});

const recommendationModel = mongoose.model('recommendation', recommendationSchema);

module.exports = recommendationModel;