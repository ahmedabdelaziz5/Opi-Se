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

            bio: joi.string().required().messages({
                "string.empty": "Bio can't be empty",
                "any.required": "Bio is required",
                "any.base": "Bio must be a string"
            }),

            fieldOfStudy: joi.string().required().messages({
                "string.empty": "Field of study can't be empty",
                "any.required": "Field of study is required",
                "any.base": "Field of study must be a string"
            }),

            specialization: joi.string().required().messages({
                "string.empty": "Specialization can't be empty",
                "any.required": "Specialization is required",
                "any.base": "Specialization must be a string"
            }),

            skills: joi.array().items(
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

            experience: joi.array().items(
                joi.object({
                    title: joi.string().required().messages({
                        "string.empty": "title can't be empty",
                        "any.required": "title is required",
                        "any.base": "title must be a string",
                    }),
                    employmentType: joi.string().required().valid("full-time", "part-time", "freelance", "internship").messages({
                        "string.empty": "Employment type can't be empty",
                        "any.required": "Employment type is required",
                        "any.base": "Employment type must be a string",
                        "any.only": "Employment type must be one of ['full-time', 'part-time', 'freelance', 'internship']"
                    }),
                    companyName: joi.string().required().messages({
                        "string.empty": "Company name can't be empty",
                        "any.required": "Company name is required",
                        "any.base": "Company name must be a string",
                    }),
                    startDate: joi.date().required().messages({
                        "string.empty": "Start date can't be empty",
                        "any.required": "Start date is required",
                        "any.base": "Start date must be a date",
                    }),
                    endDate: joi.date().required().messages({
                        "string.empty": "End date can't be empty",
                        "any.required": "End date is required",
                        "any.base": "End date must be a string",
                    }),
                    tillNow: joi.boolean().messages({
                        "string.empty": "Till now can't be empty",
                        "any.base": "Till now must be a string",
                    }),
                })
            ),

        }),
    },

    loginValid: {

        body: joi.object().required().keys({

            userName: joi.string().required().messages({
                "string.empty": "user name can't be empty",
                "any.required": "user name is required",
                "any.base": "user name must be a string",
            }),

            password: joi.string().required().messages({
                "string.empty": "password can't be empty",
                "any.required": "password is required",
                "any.base": "password must be a string",
            }),

            deviceToken: joi.string().required().messages({
                "string.empty": "device token can't be empty",
                "any.required": "device token is required",
                "any.base": "device token must be a string",
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

    verifyAccountValid: {

        body: joi.object().required().keys({
            email: joi.string().email().required().messages({
                "string.empty": "email can't be empty",
                "any.required": "email is required",
                "string.email": "email must be a valid email address",
                "any.base": "email must be a string"
            }),
            otpCode: joi.string().required().length(4).messages({
                "string.empty": "OTP can't be empty",
                "any.required": "OTP is required",
                "any.base": "OTP must be a string",
                "string.length": "OTP must be 4 characters long"
            }),
        }),
    },

    changePasswordValid: {

        body: joi.object().required().keys({

            oldPassword: joi.string().required().messages({
                "string.empty": "old password can't be empty",
                "any.required": "old password is required"
            }),

            newPassword: joi.string().required().invalid(joi.ref('oldPassword')).messages({
                "string.empty": "Password can't be empty",
                "any.required": "Password is required",
                "any.base": "Password must be a string",
                "any.invalid": "New password must be different from the old password"
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

            userName: joi.string().optional().messages({
                "string.empty": "user name can't be empty",
            }),

            email: joi.string().email().optional().messages({
                "string.empty": "email can't be empty",
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

            bio: joi.string().optional().messages({
                "string.empty": "Bio can't be empty",
                "any.base": "Bio must be a string"
            }),

            fieldOfStudy: joi.string().optional().messages({
                "string.empty": "Field of study can't be empty",
                "any.base": "Field of study must be a string"
            }),

            specialization: joi.string().optional().messages({
                "string.empty": "Specialization can't be empty",
                "any.base": "Specialization must be a string"
            }),

            skills: joi.array().items(
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

            experience: joi.array().items(
                joi.object({
                    title: joi.string().required().messages({
                        "string.empty": "title can't be empty",
                        "any.required": "title is required",
                        "any.base": "title must be a string",
                    }),
                    employmentType: joi.string().required().valid("full-time", "part-time", "freelance", "internship").messages({
                        "string.empty": "Employment type can't be empty",
                        "any.required": "Employment type is required",
                        "any.base": "Employment type must be a string",
                        "any.only": "Employment type must be one of ['full-time', 'part-time', 'freelance', 'internship']"
                    }),
                    companyName: joi.string().required().messages({
                        "string.empty": "Company name can't be empty",
                        "any.required": "Company name is required",
                        "any.base": "Company name must be a string",
                    }),
                    startDate: joi.date().required().messages({
                        "string.empty": "Start date can't be empty",
                        "any.required": "Start date is required",
                        "any.base": "Start date must be a date",
                    }),
                    endDate: joi.date().required().messages({
                        "string.empty": "End date can't be empty",
                        "any.required": "End date is required",
                        "any.base": "End date must be a string",
                    }),
                    tillNow: joi.boolean().messages({
                        "string.empty": "Till now can't be empty",
                        "any.base": "Till now must be a string",
                    }),
                })
            ),

        }),
    },

    changeProfileImageValid: {
        body: joi.object().required().keys({

            type: joi.string().required().valid('upload', 'remove').messages({
                "string.empty": "Media type can't be empty",
                "any.required": "Media type is required",
                "any.base": "Media type must be a string",
                "any.only": "Media type must be either ['upload' or 'remove'] "
            }),

        }),
    },

    getNotificationsValid: {
        params: joi.object().required().keys({
            page: joi.number().min(1).default(1).messages({
                "number.base": "page must be a number",
                "number.min": "page must be a positive number",
                "any.base": "limit must be a number"
            }),
            limit: joi.number().min(1).default(10).messages({
                "number.base": "page must be a number",
                "number.min": "page must be a positive number",
                "any.base": "limit must be a number"
            }),

        }),
    },

    resendOTPValid: {
        params: joi.object().required().keys({
            email: joi.string().email().required().messages({
                "string.empty": "email can't be empty",
                "any.required": "email is required",
                "string.email": "email must be a valid email address",
                "any.base": "email must be a string"
            }),
        }),
    },

};