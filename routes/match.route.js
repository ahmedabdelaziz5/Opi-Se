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
    declineMatchRequestValid
} = require('../validation/match.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// import decodeToken function from Auth folder
const { decodeToken } = require('../Auth/decodeToken');

// match module routes 
app.get('/getMatchRequest', decodeToken(), getMatchRequest);
app.get('/searchForSpecificPartner', decodeToken(), searchForSpecificPartner);
app.post('/sendPartnerRequest', decodeToken(), sendPartnerRequest);
app.post('/acceptMatchRequest', decodeToken(), acceptMatchRequest);
app.post('/declineMatchRequest', validator(declineMatchRequestValid), decodeToken(), declineMatchRequest);
app.post('/disMatchWithPartner', decodeToken(), disMatchWithPartner);


module.exports = app;