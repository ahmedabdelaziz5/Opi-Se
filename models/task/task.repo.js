const taskModel = require('./task.model');
const mongoose = require('mongoose');

exports.getTasks = async (filter) => {
    try {
        let tasks = await taskModel.find(filter).lean();
        if (!tasks.length) {
            return {
                success: true,
                statusCode: 404,
                message: "No tasks yet !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: tasks,
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.createTask = async (data) => {
    try {
        const taskId = new mongoose.Types.ObjectId();
        data["_id"] = taskId;
        const task = await taskModel.create(data);
        if (!task) {
            return {
                success: false,
                statusCode: 400,
                message: "Unable to create task"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "Task created successfully",
            data: task
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.updateTask = async (filter, edit, option) => {
    try {
        const result = await taskModel.findOneAndUpdate(filter, edit, option);
        if (!result) {
            return {
                success: false,
                statusCode: 400,
                message: "There is no such task !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: result
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.deleteTask = async (filter) => {
    try {
        const result = await taskModel.findOneAndDelete(filter).lean();
        if (!result) {
            return {
                success: false,
                statusCode: 401,
                message: "There is no such task !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: result
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.deleteAllTasks = async (filter) => {
    try {
        const result = await taskModel.deleteMany(filter).lean();
        if (!result.deletedCount) {
            return {
                success: false,
                statusCode: 400,
                message: "No tasks yet !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};