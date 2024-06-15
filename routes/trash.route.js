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

// authentication middleware
const isAuth = require('../Auth/isAuth');
const {
    GET_ALL_TRASH_NOTES,
    DELETE_NOTE_FROM_TRASH,
    FLUSH_TRASH,
} = require('../endpoints/trash.endpoints');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllTrashNotes', isAuth(GET_ALL_TRASH_NOTES), hasRelationship(), validator(getAllTrashNotesValid, 'params'), getAllTrashNotes);
app.delete('/deleteNoteFromTrash', isAuth(DELETE_NOTE_FROM_TRASH), hasRelationship(), validator(deleteNoteFromTrashValid, 'params'), deleteNoteFromTrash)
app.delete('/flushTrash', isAuth(FLUSH_TRASH), hasRelationship(), validator(flushTrashValid, 'params'), flushTrash);

module.exports = app;