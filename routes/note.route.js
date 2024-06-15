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

// authentication middleware
const isAuth = require('../Auth/isAuth');
const {
    GET_ALL_NOTES,
    ADD_NOTE,
    UPDATE_NOTE,
    PIN_NOTE,
    DELETE_NOTE,
    RESTORE_NOTE,
} = require('../endpoints/note.endpoints');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllNotes', isAuth(GET_ALL_NOTES), validator(getAllNotesValid, 'params'), getAllNotes);
app.post('/addNote', isAuth(ADD_NOTE), hasRelationship(), validator(addNoteValid, 'bodyAndParams'), addNote);
app.patch('/updateNote', isAuth(UPDATE_NOTE), hasRelationship(), validator(updateNoteValid, 'bodyAndParams'), updateNote);
app.patch('/pinNote', isAuth(PIN_NOTE), hasRelationship(), validator(pinNoteValid, 'bodyAndParams'), pinNote);
app.delete('/deleteNote', isAuth(DELETE_NOTE), hasRelationship(), validator(deleteNoteValid, 'params'), deleteNote);
app.delete('/restoreNote', isAuth(RESTORE_NOTE), hasRelationship(), validator(restoreNoteValid, 'params'), restoreNote);

module.exports = app;