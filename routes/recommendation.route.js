const app = require('express').Router();

//  recommendation module controller functions
const {
    submitUserPrefers,
    getPartnerRecommendation,
} = require('../controller/recommendation.controller');

// validation schema 
const {
    submitUserPrefersValid,
} = require('../validation/recommendation.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// recommendation module routes 
app.get('/getPartnerRecommendation', decodeToken(), getPartnerRecommendation);
app.post('/submitUserPrefers', validator(submitUserPrefersValid), decodeToken(), submitUserPrefers);


module.exports = app;  
