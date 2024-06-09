const joi = require("joi");
const objectId = require('joi-objectid')(joi);

module.exports = {

    getAllTrashNotesValid: {
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
                "string.pattern.name": "match id must be a valid id",
            }),
        }),
    },

    deleteNoteFromTrashValid: {

        params: joi.object().required().keys({
            noteId: objectId().required().messages({
                "string.empty": "note id can't be empty",
                "any.required": "note id is required",
                "string.pattern.name": "note id must be a valid id",
            }),
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "match id must be a valid id",
            }),
        }),

    },

    flushTrashValid: {
        params: joi.object().required().keys({
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "match id must be a valid id",
            }),
        }),
    },

};