const joi = require("joi");

module.exports = {

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
    },

    updateNoteValid: {
        body: joi.object().required().keys({

            noteTitle: joi.string(),

            noteContent: joi.string(),

            noteColor: joi.string(),
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
    },

}