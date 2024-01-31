const joi = require("joi");

module.exports = {

    sendMessageValid: {
        body: joi.object().required().keys({

            messageSender: joi.string().required(),

            messageType: joi.string().valid('poll', 'text', 'media').required(),

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
            }),

        }),
    },

    deleteMessageValid: {
        body: joi.object().required().keys({

            messageId: joi.string().required().messages({
                "string.empty": "messageId can't be empty",
                "any.required": "messageId can't be empty"
            }),

        }),
    },

    startChatSessionValid: {
        body: joi.object().required().keys({

            chatSessionRequest: joi.boolean().required().messages({
                "string.empty": "chat session request can't be empty",
                "any.required": "chat session request can't be empty"
            }),

            sessionStartTime: joi.date().optional(),

        }),
    },

    replyToSessionRequestValid: {
        body: joi.object().required().keys({

            accept: joi.boolean().required().messages({
                "string.empty": "accept can't be empty",
                "any.required": "accept can't be empty"
            }),

        }),
    },

    endChatSessionValid: {
        body: joi.object().required().keys({

            sessionDate: joi.date().required().messages({
                "string.empty": "sessionDate Id can't be empty",
                "any.required": "sessionDate Id can't be empty"
            }),

            sessionStartDate: joi.date().required().messages({
                "string.empty": "sessionStartDate can't be empty",
                "any.required": "sessionStartDate can't be empty"
            }),

            sessionEndDate: joi.date().required().messages({
                "string.empty": "sessionEndDate can't be empty",
                "any.required": "sessionEndDate can't be empty"
            }),

            sessionTopic: joi.string().required().messages({
                "string.empty": "sessionTopic can't be empty",
                "any.required": "sessionTopic can't be empty"
            }),

            sessionPoints: joi.number().required().messages({
                "string.empty": "sessionPoints can't be empty",
                "any.required": "sessionPoints can't be empty"
            }),

        }),
    },

    uploadChatMediaValid: {
        body: joi.object().required().keys({

            media: joi.array().items(
                joi.string().uri({ scheme: ['http', 'https'] }).required().messages({
                    "any.required": "media can't be empty",
                    "any.required": "media can't be empty",
                })
            )

        }),
    },

}