const app = require('express').Router();

// match module controller functions 
const {
    getMatchRequest,
    searchForSpecificPartner,
    sendPartnerRequest,
    acceptMatchRequest,
    declineMatchRequest,
    disMatchWithPartner,
} = require('../controller/match.controller');

// validation schema 
const {
    searchForSpecificPartnerValid,
    sendPartnerRequestValid,
    declineMatchRequestValid,
    acceptMatchRequestValid,
    disMatchWithPartnerValid
} = require('../validation/match.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// match module routes 
app.get('/getMatchRequest', decodeToken(), getMatchRequest);
app.get('/searchForSpecificPartner', validator(searchForSpecificPartnerValid, 'params'), decodeToken(), searchForSpecificPartner);
app.post('/sendPartnerRequest', validator(sendPartnerRequestValid, 'params'), decodeToken(), sendPartnerRequest);
app.post('/acceptMatchRequest', validator(acceptMatchRequestValid, 'params'), decodeToken(), acceptMatchRequest);
app.post('/declineMatchRequest', validator(declineMatchRequestValid), decodeToken(), declineMatchRequest);
app.post('/disMatchWithPartner', validator(disMatchWithPartnerValid, 'params'), decodeToken(), disMatchWithPartner);

module.exports = app;