const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    matchId: { type: mongoose.Types.ObjectId, required: true, ref: 'relationship' },
    noteTitle: { type: String, reqired: true },
    noteContent: { type: String, reqired: true },
    isPinned: { type: Boolean, default: false },
    noteColor: { type: String, default: '#ffffff' },
    createdAt: { type: Date, default: Date.now() },
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;