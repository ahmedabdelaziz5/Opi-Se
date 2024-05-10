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

        }),
    },

    editUserPrefersValid: {
        body: joi.object().required().keys({

            fieldOfStudy: joi.string().messages({
                "string.empty": "fieldOfStudy can't be empty",
            }),

            specialization: joi.string().messages({
                "string.empty": "specialization can't be empty",
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

        }),
    },

};