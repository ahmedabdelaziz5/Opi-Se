const app = require('express').Router();

const {
    sendPartnerRequest,
    getPartnerRecommendation,
    getMatchRequest,
    respondToMatchRequest,
    disMatchWithPartner
} = require('../controller/match.controller');

const { decodeToken } = require('../Auth/decodeToken');

app.get('/getMatchRequest', decodeToken(), getMatchRequest);
app.post('/sendPartnerRequest', decodeToken(), sendPartnerRequest);
app.post('/getPartnerRecommendation', decodeToken(), getPartnerRecommendation);
app.post('/respondToMatchRequest', decodeToken(), respondToMatchRequest);
app.post('/disMatchWithPartner', decodeToken(), disMatchWithPartner);


module.exports = app;