const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true, ref: 'user' },
    matchId: { type: ObjectId, required: true, ref: 'relationship' },
    noteTitle: { type: String, required: true },
    noteContent: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    noteColor: { type: String, default: '#ffffff' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    addedBy: { type: ObjectId, required: true, ref: 'user' },
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;