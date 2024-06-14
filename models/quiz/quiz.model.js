const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const quizSchema = new mongoose.Schema({
    user: { type: ObjectId, required: true, ref: 'user' },
    mentor: { type: ObjectId, required: true, ref: 'mentor' },
    quizTitle: { type: String, required: true, default: "General Quiz" },
    quizSubject: { type: String, required: true, default: "General" },
    coverImage: { type: String, required: true, default: "cover.png" },
    duration: { type: Number, required: true, default: 10 }, // in minutes
    deadLine: { type: Date },
    totalPoints: { type: Number, required: true, default: 0 },
    visibility: { type: Boolean, required: true, default: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        points: { type: Number, default: 1 }
    }],
});

const quizModel = mongoose.model('quiz', quizSchema);

module.exports = quizModel;