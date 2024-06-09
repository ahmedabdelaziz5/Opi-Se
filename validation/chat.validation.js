const joi = require("joi");
const objectId = require('joi-objectid')(joi);

module.exports = {

    getPartnerChatValid: {

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

    getChatMediaValid: {

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

    uploadChatMediaValid: {

        params: joi.object().required().keys({
            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),
        }),

    },

};