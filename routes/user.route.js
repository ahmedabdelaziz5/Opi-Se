const app = require('express').Router();

const {
    signUp,
    login,
    verifyAccount,
    forgetPassword,
    submitNewPassword,
    changePassword,
    editProfile,
    uploadProfileImage,
    changeProfileImage,
} = require('../controller/user.controller');

const {
    signUpValid,
    loginValid,
    submitNewPasswordValid,
    forgetPasswordValid,
    changePasswordValid,
    editProfileValid,
} = require('../validation/user.validation');

const { validator } = require('../validation/validator');

const { decodeToken } = require('../Auth/decodeToken');

app.get('/verifyAccount', verifyAccount);
app.post('/signUp', validator(signUpValid), signUp);
app.post('/login', validator(loginValid), login);
app.post('/forgetPassword', validator(forgetPasswordValid), forgetPassword);
app.post('/submitNewPassword', validator(submitNewPasswordValid), submitNewPassword);
app.post('/changePassword', decodeToken(), validator(changePasswordValid), changePassword);
app.patch('/editProfile', editProfile);
app.patch('/uploadProfileImage', uploadProfileImage);
app.patch('/changeProfileImage', changeProfileImage);


module.exports = app; 
