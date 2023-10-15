const app = require('express').Router();

const {
    signUp,
    login,
    verifyAccount,
    forgetPasswrod,
    changePassword,
    editProfile,
    uploadProfileImage,
    changeProfileImage,
} = require('../controller/user.controller');

const {
    signUpValid,
    loginValid,
    forgetPasswrodValid,
    changePasswordValid,
    editProfileValid,
} = require('../validation/user.validation');

const { validator } = require('../validation/validator');

const { decodeToken } = require('../Auth/decodeToken');

app.get('/verifyAccount', verifyAccount);
app.post('/signUp', validator(signUpValid), signUp);
app.post('/login', validator(loginValid), login);
app.post('/forgetPasswrod', forgetPasswrod);
app.post('/changePassword', changePassword);
app.patch('/editProfile', editProfile);
app.patch('/uploadProfileImage', uploadProfileImage);
app.patch('/changeProfileImage', changeProfileImage);


module.exports = app; 
