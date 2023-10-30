const joi = require("joi");

module.exports = {

    signUpValid: {
        body: joi.object().required().keys({

            userName: joi.string().required().messages({
                "string.empty": "user name can't be empty",
                "any.required": "user name is required"
            }),

            email: joi.string().email().required().messages({
                "string.empty": "email can't be empty",
                "any.required": "email is required"
            }),

            age: joi.number().required().messages({
                "string.empty": "age can't be empty",
                "any.required": "age is required"
            }),

            gender: joi.string().valid('male', 'female').required().messages({
                "string.empty": "gender can't be empty",
                "any.required": "gender is required",
                "any.only": "gender must be either 'male' or 'female'"
            }),

            location: joi.string().required().messages({
                "string.empty": "location can't be empty",
                "any.required": "location is required"
            }),

            nationalId: joi.string().required().messages({
                "string.empty": "national Id can't be empty",
                "any.required": "national Id is required"
            }),

            password: joi.string().required().messages({
                "string.empty": "password can't be empty",
                "any.required": "password is required"
            }),

            confirmPassword: joi.string().required().messages({
                "string.empty": "confirm password can't be empty",
                "any.required": "confirm password is required"
            }),

            languages: joi.array().items(
                joi.object({
                    languageName: joi.string().required().messages({
                        "string.empty": "language name is required",
                    }),
                    level: joi.number().required().messages({
                        "string.empty": "level is required",
                    }),
                })
            ),

        }),
    },

    loginValid: {

        body: joi.object().required().keys({

            userName: joi.string().required().messages({
                "string.empty": "user name can't be empty",
                "any.required": "user name is required"
            }),

            password: joi.string().required().messages({
                "string.empty": "password can't be empty",
                "any.required": "password is required"
            }),

            deviceToken: joi.string().required().messages({
                "string.empty": "device token can't be empty",
                "any.required": "device token is required"
            }),

        }),
    },

    forgetPasswordValid: {

        body: joi.object().required().keys({

            email: joi.string().email().required().messages({
                "string.empty": "email can't be empty",
                "string.required": "email is required",

            }),

        }),
    },

    submitNewPasswordValid: {
            
            body: joi.object().required().keys({
    
                password: joi.string().required().messages({
                    "string.empty": "password can't be empty",
                    "any.required": "password is required"
                }),
    
                confirmPassword: joi.string().required().messages({
                    "string.empty": "confirm password can't be empty",
                    "any.required": "confirm password is required"
                }),
    
            }),
    },

    changePasswordValid: {

        body: joi.object().required().keys({

            oldPassword: joi.string().required().messages({
                "string.empty": "old password can't be empty",
                "any.required": "old password is required"
            }),

            newPassword: joi.string().required().messages({
                "string.empty": "password can't be empty",
                "any.required": "password is required"
            }),

            confirmNewPassword: joi.string().required().messages({
                "string.empty": "confirm password can't be empty",
                "any.required": "confirm password is required"
            }),

        }),
    },

    editProfileValid: {

        body: joi.object().required().keys({

            userName: joi.string() ,

            email: joi.string().email(),

            languages: joi.array().items(
                joi.object({
                    languageName: joi.string().required().messages({
                        "string.empty": "language name is required",
                    }),
                    level: joi.number().required().messages({
                        "string.empty": "level is required",
                    }),
                })
            ),

        }),
    },

};