const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, default: "male" },
    password: { type: String, required: true },
    profileImage: { type: String, required: true, default: "default.png" },
    role: { type: String, default: "admin" },
});

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;