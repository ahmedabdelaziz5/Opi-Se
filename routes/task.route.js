const app = require('express').Router();

// note module controller functions 
const {
    getAllTasks,
    getSpecificTasksType,
    addTask,
    editTask,
    deleteTask,
    deleteAllTasksType,
} = require('../controller/task.controller');

// validation schema 
const {
    getAllTasksValid,
    addTaskValid,
    editTaskValid,
    deleteTaskValid,
    deleteAllTasksTypeValid,
    getSpecificTasksTypeValid
} = require('../validation/task.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllTasks', decodeToken(), validator(getAllTasksValid, 'params'), hasRelationship(), getAllTasks);
app.get('/getSpecificTasksType', decodeToken(), validator(getSpecificTasksTypeValid, 'params'), hasRelationship(), getSpecificTasksType);
app.post('/addTask', decodeToken(), validator(addTaskValid), hasRelationship(), addTask);
app.patch('/editTask', decodeToken(), validator(editTaskValid, 'bodyAndParams'), hasRelationship(), editTask);
app.delete('/deleteTask', decodeToken(), validator(deleteTaskValid, 'params'), hasRelationship(), deleteTask);
app.delete('/deleteAllTasksType', decodeToken(), validator(deleteAllTasksTypeValid, 'params'), hasRelationship(), deleteAllTasksType);

module.exports = app;