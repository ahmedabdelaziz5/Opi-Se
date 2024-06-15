const app = require('express').Router();

// user module controller functions
const {
    signUp,
    login,
    verifyAccount,
    forgetPassword,
    submitNewPassword,
    changePassword,
    editProfile,
    changeProfileImage,
    resendVerificationEmail,
    getNotifications,
    getUserProfile
} = require('../controller/user.controller');

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
    resendVerificationEmailValid
} = require('../validation/user.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// authentication middleware
const isAuth = require('../Auth/isAuth');
const {
    GET_USER_PROFILE,
    GET_NOTIFICATIONS,
    CHANGE_PASSWORD,
    CHANGE_PROFILE_IMAGE,
    EDIT_PROFILE,
} = require('../endpoints/user.endpoints');

// import upload middleware from mediaUpload folder
const upload = require('../helpers/mediaUpload');

// user module routes
app.get('/verifyAccount', verifyAccount);
app.get('/getUserProfile', isAuth(GET_USER_PROFILE), getUserProfile);
app.get('/resendVerificationEmail', validator(resendVerificationEmailValid, 'params'), resendVerificationEmail);
app.get('/getNotifications', validator(getNotificationsValid, 'params'), isAuth(GET_NOTIFICATIONS), getNotifications);
app.post('/signUp', validator(signUpValid), signUp);
app.post('/login', validator(loginValid), login);
app.post('/forgetPassword', validator(forgetPasswordValid), forgetPassword);
app.post('/submitNewPassword', validator(submitNewPasswordValid), submitNewPassword);
app.post('/changePassword', isAuth(CHANGE_PASSWORD), validator(changePasswordValid), changePassword);
app.post('/changeProfileImage', isAuth(CHANGE_PROFILE_IMAGE), upload.single('userImage'), validator(changeProfileImageValid), changeProfileImage);
app.patch('/editProfile', isAuth(EDIT_PROFILE), validator(editProfileValid), editProfile);

module.exports = app;  