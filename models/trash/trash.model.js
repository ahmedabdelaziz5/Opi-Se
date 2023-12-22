const mongoose = require('mongoose');

const trashSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    matchId: { type: mongoose.Types.ObjectId, required: true, ref: 'relationship' },
    noteTitle: { type: String, reqired: true },
    noteContent: { type: String, reqired: true },
    createdAt: { type: Date, default: Date.now() },
});

const trashModel = mongoose.model('trash', trashSchema);

module.exports = trashModel;