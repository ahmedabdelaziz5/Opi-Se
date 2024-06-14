const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const trashSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true, ref: 'user' },
    matchId: { type: ObjectId, required: true, ref: 'relationship' },
    noteTitle: { type: String, required: true },
    noteContent: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});

const trashModel = mongoose.model('trash', trashSchema);

module.exports = trashModel;