const app = require('express').Router();

// note module controller functions 
const {
    getAllTrashNotes,
    deleteNoteFromTrash,
    flushTrash,
} = require('../controller/trash.controller');

// validation schema 
const {
    getAllTrashNotesValid,
    deleteNoteFromTrashValid,
    flushTrashValid
} = require('../validation/trash.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllTrashNotes', validator(getAllTrashNotesValid, 'params'), decodeToken(), hasRelationship(), getAllTrashNotes);
app.delete('/deleteNoteFromTrash', validator(deleteNoteFromTrashValid, 'params'), decodeToken(), hasRelationship(), deleteNoteFromTrash);
app.delete('/flushTrash', validator(flushTrashValid, 'params'), decodeToken(), hasRelationship(), flushTrash);

module.exports = app;