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
    partnerId: { type: String, default: null },
    matchId: { type: String, default: null },
    languages: [{
        languageName: { type: String, required: true },
        level: { type: Number, required: true, default: 3 }
    }],
});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;