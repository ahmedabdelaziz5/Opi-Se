const app = require('express').Router();

// chat module controller functions 
const {
    getPartnerChat,
    getChatMedia,
    uploadChatMedia
} = require('../controller/chat.controller');

// import upload middleware from mediaUpload folder
const upload = require('../helpers/mediaUpload');
const maxMediaCount = 5;

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// chat module routes 
app.get('/getPartnerChat', decodeToken(), getPartnerChat);
app.get('/getChatMedia', decodeToken(), getChatMedia);
app.post('/uploadChatMedia', decodeToken(), upload.array('chatMedia', maxMediaCount), uploadChatMedia);

module.exports = app;