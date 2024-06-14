const joi = require("joi");
const objectId = require('joi-objectid')(joi);

module.exports = {

    getAllNotesValid: {

        params: joi.object().required().keys({
            page: joi.number().optional().min(1).messages({
                "string.empty": "page can't be empty",
                "any.base": "page must be a number"
            }),
            limit: joi.number().optional().min(1).messages({
                "string.empty": "limit can't be empty",
                "any.base": "limit must be a number"
            }),
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),
        }),

    },

    addNoteValid: {
        body: joi.object().required().keys({
            noteTitle: joi.string().required().messages({
                "string.empty": "noteTitle can't be empty",
                "any.required": "noteTitle is required"
            }),
            noteContent: joi.string().required().messages({
                "string.empty": "note content can't be empty",
                "any.required": "note content is required"
            }),
            noteColor: joi.string().required().messages({
                "string.empty": "note color can't be empty",
                "any.required": "note color is required"
            }),
        }),
        params: joi.object().required().keys({
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),
        }),
    },

    updateNoteValid: {
        body: joi.object().required().keys({
            noteTitle: joi.string(),
            noteContent: joi.string(),
            noteColor: joi.string(),
        }),
        params: joi.object().required().keys({
            noteId: objectId().required().messages({
                "string.empty": "note id can't be empty",
                "any.required": "note id is required",
                "string.pattern.name": "note id must be a valid id",
            }),
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),
        }),
    },

    pinNoteValid: {
        body: joi.object().required().keys({
            isPinned: joi.boolean().required().valid(true, false).messages({
                "boolean.empty": "isPinned can't be empty",
                "any.required": "isPinned is required",
                "any.only": "isPinned must be true or false"
            }),
        }),
        params: joi.object().required().keys({
            noteId: objectId().required().messages({
                "string.empty": "note id can't be empty",
                "any.required": "note id is required",
                "string.pattern.name": "note id must be a valid id",
            }),
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),
        }),
    },

    deleteNoteValid: {
        params: joi.object().required().keys({
            noteId: objectId().required().messages({
                "string.empty": "note id can't be empty",
                "any.required": "note id is required",
                "string.pattern.name": "note id must be a valid id",
            }),
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),
        }),
    },

    restoreNoteValid: {
        params: joi.object().required().keys({
            noteId: objectId().required().messages({
                "string.empty": "note id can't be empty",
                "any.required": "note id is required",
                "string.pattern.name": "note id must be a valid id",
            }),
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),
        }),
    },

};