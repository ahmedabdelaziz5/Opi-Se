const joi = require("joi");

module.exports = {

    submitUserPrefersValid: {
        body: joi.object().required().keys({

            fieldOfStudy: joi.string().required().messages({
                "string.empty": "fieldOfStudy can't be empty",
                "any.required": "fieldOfStudy is required"
            }),

            specialization: joi.string().required().messages({
                "string.empty": "specialization can't be empty",
                "any.required": "specialization is required"
            }),

            userSkills: joi.array().items(
                joi.object({
                    skillName: joi.string().required().messages({
                        "string.empty": "skill name can't be empty",
                        "any.required": "skill name is required"
                    }),
                    skillRate: joi.number().required().messages({
                        "string.empty": "skill rate can't be empty",
                        "any.required": "skill rate is required"
                    }),
                })
            ),

            userQuestions: joi.array().items(
                joi.object({
                    question: joi.string().required().messages({
                        "string.empty": "question can't be empty",
                        "any.required": "question is required"
                    }),
                    answer: joi.string().required().messages({
                        "string.empty": "answer can't be empty",
                        "any.required": "answer is required"
                    }),
                })
            ),

        }),
    },
}