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

// authentication middleware
const isAuth = require('../Auth/isAuth');
const {
    GET_PARTNER_RECOMMENDATION,
    SUBMIT_USER_PREFERS,
    EDIT_USER_PREFERS,
} = require('../endpoints/recommendation.endpoints');

// recommendation module routes 
app.get('/getPartnerRecommendation', isAuth(GET_PARTNER_RECOMMENDATION), validator(getPartnerRecommendationValid), getPartnerRecommendation);
app.post('/submitUserPrefers', isAuth(SUBMIT_USER_PREFERS), validator(submitUserPrefersValid), submitUserPrefers);
app.patch('/editUserPrefers', isAuth(EDIT_USER_PREFERS), validator(editUserPrefersValid), editUserPrefers);

module.exports = app;  
