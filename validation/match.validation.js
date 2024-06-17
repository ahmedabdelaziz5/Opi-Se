const joi = require("joi");
const objectId = require('joi-objectid')(joi);

module.exports = {

    searchForSpecificPartnerValid: {

        params: joi.object().required().keys({
            userId: objectId().required().messages({
                "string.empty": "user id can't be empty",
                "any.required": "user id is required",
                "string.pattern.name": "user id must be a valid id",
            }),
        }),

    },

    sendPartnerRequestValid: {

        params: joi.object().required().keys({
            userId: objectId().required().messages({
                "string.empty": "user id can't be empty",
                "any.required": "user id is required",
                "string.pattern.name": "user id must be a valid id",
            }),
        }),

    },

    declineMatchRequestValid: {
        body: joi.object().required().keys({

            rejectedUserId: objectId().required().messages({
                "string.empty": "user id can't be empty",
                "any.required": "user id is required",
                "string.pattern.name": "user id must be a valid id",
            }),

            email: joi.string().email().required().messages({
                "string.empty": "email can't be empty",
                "any.required": "email is required"
            }),

        }),
    },

    acceptMatchRequestValid: {

        params: joi.object().required().keys({
            nationalId: joi.string().required().length(14).pattern(/^[0-9]+$/).messages({
                "string.empty": "National ID can't be empty",
                "any.required": "National ID is required",
                "string.length": "National ID must be 12 characters long",
                "string.pattern": "National ID must contain only numbers",
            }),
            partner2Id: objectId().required().messages({
                "string.empty": "partner id can't be empty",
                "any.required": "partner id is required",
                "string.pattern.name": "partner id must be a valid id",
            }),
        }),

    },

    disMatchWithPartnerValid: {

        params: joi.object().required().keys({
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "match id must be a valid id",
            }),
        }),

    },

};