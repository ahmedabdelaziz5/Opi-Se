const app = require('express').Router();

// chat module controller functions 
const {
    getPartnerChat,
    getChatMedia,
    uploadChatMedia
} = require('../controller/chat.controller');

// validation schema 
const {
    getPartnerChatValid,
    getChatMediaValid,
    uploadChatMediaValid,
} = require('../validation/chat.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import upload middleware from mediaUpload folder
const upload = require('../helpers/mediaUpload');
const maxMediaCount = 5;

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// chat module routes 
app.get('/getPartnerChat', validator(getPartnerChatValid, 'params'), decodeToken(), getPartnerChat);
app.get('/getChatMedia', validator(getChatMediaValid, 'params'), decodeToken(), getChatMedia);
app.post('/uploadChatMedia', decodeToken(), upload.array('chatMedia', maxMediaCount), validator(uploadChatMediaValid, 'params'), uploadChatMedia);

module.exports = app;