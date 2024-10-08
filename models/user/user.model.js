const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, default: "male" },
    location: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: true, default: "default.png" },
    isVerified: { type: Boolean, default: false },
    numOfReports: { type: Number, default: 0 },
    partnerId: { type: String, default: null, ref: 'user' },
    matchId: { type: objectId, default: null, ref: 'relationship' },
    isAvailable: { type: Boolean, default: true },
    joinedAt: { type: Date, default: Date.now() },
    getUserPrefers: { type: Boolean, default: true },
    points: { type: Number, default: 0 },
    profileDetails: { type: objectId, ref: 'recommendation' },
    bio: { type: String, default: "blank" },
    notifications: [{
        message: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now() },
    }],
    deviceTokens: [String],
    languages: [{
        languageName: { type: String, required: true },
        level: { type: Number, required: true, default: 3 }
    }],
    partnerRequests: [{ type: objectId, ref: 'user' }],
    sentRequests: [String],
    history: [{
        matchId: { type: objectId, required: true, ref: 'relationship' },
    }],
    mentors: [{ type: objectId, ref: 'mentor' }],
    role: { type: String, default: "user" },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;