const app = require('express').Router();

// note module controller functions 
const {
    addNote,
    deleteNote,
    updateNote,
    getAllNotes,
    pinNote,
    restoreNote,
} = require('../controller/note.controller');

// validation schema 
const {
    getAllNotesValid,
    addNoteValid,
    updateNoteValid,
    pinNoteValid,
    deleteNoteValid,
    restoreNoteValid
} = require('../validation/note.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllNotes', validator(getAllNotesValid, 'params'), decodeToken(), getAllNotes);
app.post('/addNote', validator(addNoteValid, 'bodyAndParams'), decodeToken(), hasRelationship(), addNote);
app.patch('/updateNote', validator(updateNoteValid, 'bodyAndParams'), decodeToken(), hasRelationship(), updateNote);
app.patch('/pinNote', validator(pinNoteValid, 'bodyAndParams'), decodeToken(), hasRelationship(), pinNote);
app.delete('/deleteNote', validator(deleteNoteValid, 'params'), decodeToken(), hasRelationship(), deleteNote);
app.delete('/restoreNote', validator(restoreNoteValid, 'params'), decodeToken(), hasRelationship(), restoreNote);

module.exports = app;