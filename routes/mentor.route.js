const app = require('express').Router();

// mentor module controller functions
const {
    signUp,
    login,
    verifyAccount,
    forgetPassword,
    submitNewPassword,
    changePassword,
    editProfile,
    changeProfileImage,
    resendOTP,
    getNotifications,
    getMentorProfile,
    getAllMentors
} = require('../controller/mentor.controller');

// validation schema 
const {
    signUpValid,
    loginValid,
    submitNewPasswordValid,
    forgetPasswordValid,
    changePasswordValid,
    editProfileValid,
    changeProfileImageValid,
    getNotificationsValid,
    resendOTPValid,
    verifyAccountValid
} = require('../validation/mentor.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// authentication middleware
const isAuth = require('../Auth/isAuth');
const { decodeToken } = require('../Auth/decodeToken');
const {
    GET_MENTOR_PROFILE,
    GET_ALL_MENTORS,
    GET_NOTIFICATIONS,
    CHANGE_PASSWORD,
    CHANGE_PROFILE_IMAGE,
    EDIT_PROFILE,
} = require('../endpoints/mentor.endpoints');

// import upload middleware from mediaUpload folder
const { upload } = require('../helpers/mediaUpload');

// user module routes
app.get('/getMentorProfile', isAuth(GET_MENTOR_PROFILE), getMentorProfile);
app.get('/getAllMentors', isAuth(GET_ALL_MENTORS), getAllMentors);
app.get('/resendOTP', validator(resendOTPValid, 'params'), resendOTP);
app.get('/getNotifications', isAuth(GET_NOTIFICATIONS), validator(getNotificationsValid, 'params'), getNotifications);
app.post('/signUp', validator(signUpValid), signUp);
app.post('/login', validator(loginValid), login);
app.post('/forgetPassword', validator(forgetPasswordValid), forgetPassword);
app.post('/submitNewPassword', decodeToken(), validator(submitNewPasswordValid), submitNewPassword);
app.post('/changePassword', isAuth(CHANGE_PASSWORD), validator(changePasswordValid), changePassword);
app.post('/changeProfileImage', isAuth(CHANGE_PROFILE_IMAGE), upload.single('userImage'), validator(changeProfileImageValid), changeProfileImage);
app.patch('/editProfile', isAuth(EDIT_PROFILE), validator(editProfileValid), editProfile);
app.patch('/verifyAccount', validator(verifyAccountValid), verifyAccount);

module.exports = app;  