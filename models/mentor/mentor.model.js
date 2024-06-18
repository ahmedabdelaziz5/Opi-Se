const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const mentorSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, default: "male" },
    location: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: true, default: "default.png" },
    isVerified: { type: Boolean, default: false },
    otpCode: { type: String, default: null },
    isApproved: { type: Boolean, default: true }, // will be false when add admin dashboard to approve admins
    numOfReports: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now() },
    bio: { type: String, default: "blank" },
    fieldOfStudy: { type: String, required: true },
    specialization: { type: String, required: true },
    languages: [{
        languageName: { type: String, required: true },
        level: { type: Number, required: true, default: 3 }
    }],
    skills: [{
        skillName: { type: String, required: true },
        skillRate: { type: Number, required: true, default: 0 }
    }],
    experience: [{
        title: { type: String, required: true },
        employmentType: { type: String, required: true, enum: ["full-time", "part-time", "freelance", "internship"] },
        companyName: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, default: Date.now() },
    }],
    mentorRequests: [{
        studentId: { type: objectId, required: true, ref: 'user' },
        nationalId: { type: String, required: true },
        requestStatus: { type: String, default: "pending" },
        email: { type: String, required: true },
    }],
    notifications: [{
        message: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now() },
    }],
    resume: { type: String },
    certificates: [String],
    deviceTokens: [String],
    points: { type: Number, default: 0 },
    role: { type: String, default: "mentor" },
});

const mentorModel = mongoose.model('mentor', mentorSchema);

module.exports = mentorModel;