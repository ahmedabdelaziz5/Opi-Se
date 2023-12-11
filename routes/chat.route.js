const app = require('express').Router();

// chat module controller functions 
const {
    getPartnerChat,
    deletePartnerChat,
    uploadChatMedia
} = require('../controller/chat.controller');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// chat module routes 
app.get('/getPartnerChat', decodeToken(), getPartnerChat);
app.delete('/deletePartnerChat', decodeToken(), deletePartnerChat);
app.post('/uploadChatMedia', decodeToken(), uploadChatMedia);

module.exports = app;