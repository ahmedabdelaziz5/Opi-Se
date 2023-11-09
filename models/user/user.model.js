const { boolean } = require('joi');
const mongoose = require('mongoose');

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
    partnerId: { type: String, default: null, ref : 'user' },
    matchId: { type: String, default: null, ref: 'user' },
    isAvailable: { type: Boolean, default: true },
    joinedAt: { type: Date, default: Date.now() },
    getUserPrefers: { type: Boolean, default: true },
    points: { type: Number, default: 0 },
    notifications: [{
        message: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now() },
    }],
    deviceTokens: [{
        type: String, required: true,
    }],
    languages: [{
        languageName: { type: String, required: true },
        level: { type: Number, required: true, default: 3 }
    }],
    partnerRequests: [{
        partnerId: { type: mongoose.Types.ObjectId, required: true },
        nationalId: { type: String, required: true },
        partnerUserName: { type: String, required: true },
        requestStatus: { type: String, default: "pending" },
        email: { type: String, required: true },
    }],
    history: [{
        matchId: { type: String, required: true, ref: 'relationship' },
    }]
});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;