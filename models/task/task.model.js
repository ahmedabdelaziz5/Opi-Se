const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true, default: "descreption" },
    addedBy: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    matchId: { type: mongoose.Types.ObjectId, required: true, ref: 'relationship' },
    taskStatus: { type: String, required: true, default: "toDo" }, // To do , In progress, Done
    createdAt: { type: Date, default: Date.now() },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    doneAt: { type: Date },
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;