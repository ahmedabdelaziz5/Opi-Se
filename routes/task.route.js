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

// authentication middleware
const isAuth = require('../Auth/isAuth');
const {
    GET_ALL_TASKS,
    GET_SPECIFIC_TASKS_TYPE,
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    DELETE_ALL_TASKS_TYPE,
} = require('../endpoints/task.endpoints');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllTasks', isAuth(GET_ALL_TASKS), hasRelationship(), validator(getAllTasksValid, 'params'), getAllTasks);
app.get('/getSpecificTasksType', isAuth(GET_SPECIFIC_TASKS_TYPE), hasRelationship(), validator(getSpecificTasksTypeValid, 'params'), getSpecificTasksType);
app.post('/addTask', isAuth(ADD_TASK), hasRelationship(), validator(addTaskValid), addTask);
app.patch('/editTask', isAuth(EDIT_TASK), hasRelationship(), validator(editTaskValid, 'bodyAndParams'), editTask);
app.delete('/deleteTask', isAuth(DELETE_TASK), hasRelationship(), validator(deleteTaskValid, 'params'), deleteTask);
app.delete('/deleteAllTasksType', isAuth(DELETE_ALL_TASKS_TYPE), hasRelationship(), validator(deleteAllTasksTypeValid, 'params'), deleteAllTasksType);

module.exports = app;