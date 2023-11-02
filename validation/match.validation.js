const joi = require("joi");

module.exports = {

    declineMatchRequestValid: {
        body: joi.object().required().keys({

            rejectedUserId: joi.string().required().messages({
                "string.empty": "user Id can't be empty",
                "any.required": "user Id is required"
            }),

            email: joi.string().email().required().messages({
                "string.empty": "email can't be empty",
                "any.required": "email is required"
            }),

        }),
    },
}