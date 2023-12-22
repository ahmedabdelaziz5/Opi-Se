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
    addNoteValid,
    updateNoteValid,
    pinNoteValid,
} = require('../validation/note.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllNotes', decodeToken(), hasRelationship(), getAllNotes);
app.post('/addNote', validator(addNoteValid), decodeToken(), hasRelationship(), addNote);
app.patch('/updateNote', validator(updateNoteValid), decodeToken(), hasRelationship(), updateNote);
app.patch('/pinNote', validator(pinNoteValid), decodeToken(), hasRelationship(), pinNote);
app.delete('/deleteNote', decodeToken(), hasRelationship(), deleteNote);
app.delete('/restoreNote', decodeToken(), hasRelationship(), restoreNote);

module.exports = app;