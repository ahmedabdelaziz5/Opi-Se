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
                "string.empty": "Password can't be empty",
                "any.required": "Password is required",
                "any.base": "Password must be a string"
            }),

            confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
                "string.empty": "Confirm password can't be empty",
                "any.required": "Confirm password is required",
                "any.only": "Confirm password must match the password",
                "any.base": "Confirm password must be a string"
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
                "string.empty": "Password can't be empty",
                "any.required": "Password is required",
                "any.base": "Password must be a string"
            }),

            confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
                "string.empty": "Confirm password can't be empty",
                "any.required": "Confirm password is required",
                "any.only": "Confirm password must match the password",
                "any.base": "Confirm password must be a string"
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
                "string.empty": "Password can't be empty",
                "any.required": "Password is required",
                "any.base": "Password must be a string"
            }),

            confirmNewPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
                "string.empty": "Confirm password can't be empty",
                "any.required": "Confirm password is required",
                "any.only": "Confirm password must match the password",
                "any.base": "Confirm password must be a string"
            }),

        }),
    },

    editProfileValid: {

        body: joi.object().required().keys({

            userName: joi.string(),

            email: joi.string().email(),

            bio: joi.string(),

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