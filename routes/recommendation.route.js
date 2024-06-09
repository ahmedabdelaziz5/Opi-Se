const app = require('express').Router();

//  recommendation module controller functions
const {
    submitUserPrefers,
    editUserPrefers,
    getPartnerRecommendation,
} = require('../controller/recommendation.controller');

// validation schema 
const {
    getPartnerRecommendationValid,
    submitUserPrefersValid,
    editUserPrefersValid
} = require('../validation/recommendation.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// recommendation module routes 
app.get('/getPartnerRecommendation', validator(getPartnerRecommendationValid), decodeToken(), getPartnerRecommendation);
app.post('/submitUserPrefers', validator(submitUserPrefersValid), decodeToken(), submitUserPrefers);
app.patch('/editUserPrefers', validator(editUserPrefersValid), decodeToken(), editUserPrefers);

module.exports = app;  
