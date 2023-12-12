const app = require('express').Router();

// chat module controller functions 
const {
    getPartnerChat,
    getChatMedia,
    uploadChatMedia
} = require('../controller/chat.controller');

// import upload middleware from mediaUpload folder
const upload = require('../helpers/mediaUpload');

// chat module routes 
app.get('/getPartnerChat', getPartnerChat);
app.get('/getChatMedia', getChatMedia);
app.post('/uploadChatMedia', upload.array('chatMedia', 5), uploadChatMedia);

module.exports = app;