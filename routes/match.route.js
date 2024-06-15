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

// authentication middleware
const isAuth = require('../Auth/isAuth');
const {
    GET_MATCH_REQUEST,
    SEARCH_FOR_SPECIFIC_PARTNER,
    SEND_PARTNER_REQUEST,
    ACCEPT_MATCH_REQUEST,
    DECLINE_MATCH_REQUEST,
    DISMATCH_WITH_PARTNER,
} = require('../endpoints/match.endpoints');

// match module routes 
app.get('/getMatchRequest', isAuth(GET_MATCH_REQUEST), getMatchRequest);
app.get('/searchForSpecificPartner', isAuth(SEARCH_FOR_SPECIFIC_PARTNER), validator(searchForSpecificPartnerValid, 'params'), searchForSpecificPartner);
app.post('/sendPartnerRequest', isAuth(SEND_PARTNER_REQUEST), validator(sendPartnerRequestValid, 'params'), sendPartnerRequest);
app.post('/acceptMatchRequest', isAuth(ACCEPT_MATCH_REQUEST), validator(acceptMatchRequestValid, 'params'), acceptMatchRequest);
app.post('/declineMatchRequest', isAuth(DECLINE_MATCH_REQUEST), validator(declineMatchRequestValid), declineMatchRequest);
app.post('/disMatchWithPartner', isAuth(DISMATCH_WITH_PARTNER), validator(disMatchWithPartnerValid, 'params'), disMatchWithPartner);

module.exports = app;