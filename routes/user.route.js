const app = require('express').Router();

const {
    signUp,
    login,
    verifyAccount,
    forgetPassword,
    submitNewPassword,
    changePassword,
    editProfile,
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
const upload = require('../helpers/mediaUpload');

app.get('/verifyAccount', verifyAccount);
app.post('/signUp', validator(signUpValid), signUp);
app.post('/login', validator(loginValid), login);
app.post('/forgetPassword', validator(forgetPasswordValid), forgetPassword);
app.post('/submitNewPassword', validator(submitNewPasswordValid), submitNewPassword);
app.post('/changePassword', decodeToken(), validator(changePasswordValid), changePassword);
app.patch('/editProfile', decodeToken(), validator(editProfileValid), editProfile);
app.post('/changeProfileImage', decodeToken(), upload.single('userImage'), changeProfileImage);


module.exports = app;  
