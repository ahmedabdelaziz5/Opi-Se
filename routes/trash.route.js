const app = require('express').Router();

// note module controller functions 
const {
    getAllTrashNotes,
    deleteNoteFromTrash,
    flushTrash,
} = require('../controller/trash.controller');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// caching layer to check relationship 
const { hasRelationship } = require('../Auth/hasRelationship');

// note module routes 
app.get('/getAllTrashNotes', decodeToken(), hasRelationship(), getAllTrashNotes);
app.delete('/deleteNoteFromTrash', decodeToken(), hasRelationship(), deleteNoteFromTrash);
app.delete('/flushTrash', decodeToken(), hasRelationship(), flushTrash);

module.exports = app;