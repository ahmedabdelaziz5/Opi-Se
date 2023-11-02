const app = require('express').Router();

const {
    getMatchRequest,
    searchForSpecificPartner,
    getPartnerRecommendation,
    sendPartnerRequest,
    acceptMatchRequest,
    declineMatchRequest,
    disMatchWithPartner,
} = require('../controller/match.controller');

const { decodeToken } = require('../Auth/decodeToken');

app.get('/getMatchRequest', decodeToken(), getMatchRequest);
app.get('/searchForSpecificPartner', decodeToken(), searchForSpecificPartner);
app.get('/getPartnerRecommendation', decodeToken(), getPartnerRecommendation);
app.post('/sendPartnerRequest', decodeToken(), sendPartnerRequest);
app.post('/acceptMatchRequest', decodeToken(), acceptMatchRequest);
app.post('/declineMatchRequest', decodeToken(), declineMatchRequest);
app.post('/disMatchWithPartner', decodeToken(), disMatchWithPartner);


module.exports = app;