const joi = require("joi");

module.exports = {

    sendMessageValid: {
        body: joi.object().required().keys({

            messageSender: joi.string().required(),

            messageType: joi.string().valid('poll', 'text').required(),

            messageContent: joi.string().when('messageType', {
                is: 'text',
                then: joi.required(),
                otherwise: joi.forbidden()
            }),

            pollQuestion: joi.string().when('messageType', {
                is: 'poll',
                then: joi.required(),
                otherwise: joi.forbidden()
            }),

            pollAnswers: joi.array().items(
                joi.object({
                    optionNumber: joi.number().required(),
                    optionContent: joi.string().required()
                })
            ).when('messageType', {
                is: 'poll',
                then: joi.required(),
                otherwise: joi.forbidden()
            })

        }),
    },

    startChatSessionValid: {
        body: joi.object().required().keys({

            chatSessionRequest: joi.string().required().messages({
                "string.empty": "chat session request can't be empty",
                "any.required": "chat session request can't be empty"
            }),

        }),
    },

    replyToSessionRequestValid: {
        body: joi.object().required().keys({

            notifiedPartner: joi.string().required().messages({
                "string.empty": "notified partner Id can't be empty",
                "any.required": "notified partner Id can't be empty"
            }),

        }),
    },

    endChatSessionValid: {
        body: joi.object().required().keys({

            notifiedPartner: joi.string().required().messages({
                "string.empty": "notified partner Id can't be empty",
                "any.required": "notified partner Id can't be empty"
            }),

        }),
    },

    uploadChatMediaValid: {
        body: joi.object().required().keys({

            notifiedPartner: joi.string().required().messages({
                "string.empty": "notified partner Id can't be empty",
                "any.required": "notified partner Id can't be empty"
            }),

        }),
    },


}