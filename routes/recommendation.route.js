const app = require('express').Router();

const {
    submitUserPrefers,
    getPartnerRecommendation,
} = require('../controller/recommendation.controller');

const {
    submitUserPrefersValid,
} = require('../validation/recommendation.validation');

const { validator } = require('../validation/validator');

const { decodeToken } = require('../Auth/decodeToken');

app.get('/getPartnerRecommendation', decodeToken(), getPartnerRecommendation);
app.post('/submitUserPrefers', validator(submitUserPrefersValid), decodeToken(), submitUserPrefers);


module.exports = app;  
