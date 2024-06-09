const joi = require("joi");

module.exports = {

    acceptPartnerRequestValid: {
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


};