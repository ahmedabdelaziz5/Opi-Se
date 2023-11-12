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
    resendVerificationEmail
} = require('../controller/user.controller');

// validation schema 
const {
    signUpValid,
    loginValid,
    submitNewPasswordValid,
    forgetPasswordValid,
    changePasswordValid,
    editProfileValid,
} = require('../validation/user.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// import upload middleware from mediaUpload folder
const upload = require('../helpers/mediaUpload');

// user module routes
app.get('/verifyAccount', verifyAccount);
app.get('/resendVerificationEmail', resendVerificationEmail);
app.post('/signUp', validator(signUpValid), signUp);
app.post('/login', validator(loginValid), login);
app.post('/forgetPassword', validator(forgetPasswordValid), forgetPassword);
app.post('/submitNewPassword', validator(submitNewPasswordValid), submitNewPassword);
app.post('/changePassword', decodeToken(), validator(changePasswordValid), changePassword);
app.post('/changeProfileImage', decodeToken(), upload.single('userImage'), changeProfileImage);
app.patch('/editProfile', decodeToken(), validator(editProfileValid), editProfile);


module.exports = app;  
