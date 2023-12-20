const app = require('express').Router();

// note module controller functions 
const {
    
} = require('../controller/match.controller');

// validation schema 
const {

} = require('../validation/match.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// note module routes 
// app.post('/addNote', validator(addNoteValid), decodeToken(), addNote);




module.exports = app;