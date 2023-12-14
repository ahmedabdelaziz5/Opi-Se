const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    nationalId: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    specialization: { type: String, required: true },
    partnerRate: [{
        partnerId: { type: String, required: true },
        rate: { type: Number, required: true, default: 0 }
    }],
    userRecommendations: [{
        nationalId: { type: String, required: true },
        score: { type: Number, required: true, default: 0 }
    }],
    userQuestions: [{
        question: { type: String, required: true },
        answer: { type: String, required: true },
    }],
    userSkills: [{
        skillName: { type: String, required: true },
        skillRate: { type: Number, required: true, default: 0 }
    }]
});

const recommendationModel = mongoose.model('recommendation', recommendationSchema);

module.exports = recommendationModel;



[

]