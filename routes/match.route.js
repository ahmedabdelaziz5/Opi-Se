const app = require('express').Router();

const {
    sendPartnerRequest,
    getPartnerRecommendation,
    getMatchRequest,
    respondToMatchRequest,
    disMatchWithPartner,
    searchForSpecificPartner,
} = require('../controller/match.controller');

const { decodeToken } = require('../Auth/decodeToken');

app.get('/getMatchRequest', decodeToken(), getMatchRequest);
app.get('/searchForSpecificPartner', decodeToken(), searchForSpecificPartner);
app.get('/getPartnerRecommendation', decodeToken(), getPartnerRecommendation);
app.post('/sendPartnerRequest', decodeToken(), sendPartnerRequest);
app.post('/respondToMatchRequest', decodeToken(), respondToMatchRequest);
app.post('/disMatchWithPartner', decodeToken(), disMatchWithPartner);


module.exports = app;