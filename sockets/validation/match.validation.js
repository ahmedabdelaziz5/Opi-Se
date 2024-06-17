const joi = require("joi");
const objectId = require('joi-objectid')(joi);

module.exports = {

    acceptPartnerRequestValid: {
        body: joi.object().required().keys({

            notifiedPartner: joi.string().required().messages({
                "string.empty": "notified partner Id can't be empty",
                "any.required": "notified partner Id can't be empty"
            }),

            matchId: objectId().required().messages({
                "string.empty": "match id can't be empty",
                "any.required": "match id is required",
                "string.pattern.name": "matchId must be a valid id",
            }),

            partnerId: objectId().required().messages({
                "string.empty": "partner id can't be empty",
                "any.required": "partner id is required",
                "string.pattern.name": "partner id must be a valid id",
            }),

            partnerUserName: joi.string().required().messages({
                "string.empty": "partner user name can't be empty",
                "any.required": "partner user name can't be empty"
            }),

            partnerImage: joi.string().required().messages({
                "string.empty": "partner image can't be empty",
                "any.required": "partner image Id is required"
            }),

        }),
    },


};