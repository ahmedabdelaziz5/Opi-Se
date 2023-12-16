const app = require('express').Router();

// chat module controller functions 
const {
    getPartnerChat,
    getChatMedia,
    uploadChatMedia
} = require('../controller/chat.controller');

// import upload middleware from mediaUpload folder
const upload = require('../helpers/mediaUpload');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// chat module routes 
app.get('/getPartnerChat', decodeToken(), getPartnerChat);
app.get('/getChatMedia', decodeToken(), getChatMedia);
app.post('/uploadChatMedia', upload.array('chatMedia', 5), uploadChatMedia);

module.exports = app;