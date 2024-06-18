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
const { upload } = require('../helpers/mediaUpload');
const maxMediaCount = 5;

// authentication middleware
const isAuth = require('../Auth/isAuth');
const {
    GET_PARTNER_CHAT,
    GET_CHAT_MEDIA,
    UPLOAD_CHAT_MEDIA,
} = require('../endpoints/chat.endpoints');

// chat module routes 
app.get('/getPartnerChat', isAuth(GET_PARTNER_CHAT), validator(getPartnerChatValid, 'params'), getPartnerChat);
app.get('/getChatMedia', isAuth(GET_CHAT_MEDIA), validator(getChatMediaValid, 'params'), getChatMedia);
app.post('/uploadChatMedia', isAuth(UPLOAD_CHAT_MEDIA), upload.array('chatMedia', maxMediaCount), validator(uploadChatMediaValid, 'params'), uploadChatMedia);

module.exports = app;