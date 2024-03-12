const taskRepo = require('../models/task/task.repo');

// function that allows user to get all tasks 
exports.getAllTasks = async (req, res) => {
    try {
        const { matchId } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let data = await taskRepo.getTasks({ matchId }, { page, limit });
        return res.status(data.statusCode).json(data);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to get all tasks of specific type
exports.getSpecificTasksType = async (req, res) => {
    try {
        const { matchId, type } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let data = await taskRepo.getTasks({ matchId, taskStatus: type }, { page, limit });
        return res.status(data.statusCode).json(data);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to create a new task 
exports.addTask = async (req, res) => {
    try {
        const taskData = req.body;
        taskData['addedBy'] = req.user.id;
        taskData['matchId'] = req.query.matchId;
        let addTaskPromis = await taskRepo.createTask(taskData);
        return res.status(addTaskPromis.statusCode).json(addTaskPromis);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to edit a specific task 
exports.editTask = async (req, res) => {
    try {
        const taskData = req.body;
        const { matchId, taskId } = req.query;
        let editTaskPromis = await taskRepo.updateTask({ matchId, _id: taskId }, taskData, { new: true });
        return res.status(editTaskPromis.statusCode).json(editTaskPromis);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to delete a specific task 
exports.deleteTask = async (req, res) => {
    try {
        const { matchId, taskId } = req.query;
        let deleteTaskPromis = await taskRepo.deleteTask({ matchId, _id: taskId });
        return res.status(deleteTaskPromis.statusCode).json(deleteTaskPromis);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to delete all tasks of specfic type 
exports.deleteAllTasksType = async (req, res) => {
    try {
        const { matchId, type } = req.query;
        let deleteTaskPromis = await taskRepo.deleteAllTasks({ matchId, taskStatus: type });
        return res.status(deleteTaskPromis.statusCode).json(deleteTaskPromis);
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};