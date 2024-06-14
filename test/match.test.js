const chai = require('chai');
const app = require('../app');
const data = require('./tmpData');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('___________getMatchRequest___________', () => {

    it('should return status 200 and partnerRequests array', (done) => {
        chai.
            request(app)
            .get('/getMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

    it('should return status 401 if the userId was not valid', (done) => {
        chai.
            request(app)
            .get('/getMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(401);
                chai.expect(res.body.message).to.equal('Not Authorized !');
                done();
            })
    });

    it('should return status 400 if the user not exist', (done) => {
        chai.
            request(app)
            .get('/getMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(400);
                chai.expect(res.body.message).to.equal("user not exist , please sign up first !");
                done();
            })
    });

});

describe('___________searchForSpecificPartner___________', () => {

    it('it should return 200 if partner exist', (done) => {
        chai.
            request(app)
            .get('/searchForSpecificPartner')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ userId: data.userId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

    it('it should return 401 if the id was not valid', (done) => {
        chai.
            request(app)
            .get('/searchForSpecificPartner')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ userId: data.userId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(401);
                chai.expect(res.body.message).to.equal('Not Authorized !');
                done();
            })
    });

    it('it should return 400 if the partner not exist', (done) => {
        chai.
            request(app)
            .get('/searchForSpecificPartner')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ userId: data.userId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(400);
                chai.expect(res.body.message).to.equal('partner not found !');
                done();
            })
    });

});

describe('___________sendPartnerRequest___________', () => {

    it('it should return 200 if saved notification, save the partner request and send push notification ', (done) => {
        chai.
            request(app)
            .post('/sendPartnerRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ userId: data.userId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

    it('it should return 401 if the id was not valid', (done) => {
        chai.
            request(app)
            .post('/sendPartnerRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ userId: data.userId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(401);
                chai.expect(res.body.message).to.equal('Not Authorized !');
                done();
            })
    });

    it('it should return 400 if the partner account does not exist', (done) => {
        chai.
            request(app)
            .post('/sendPartnerRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ userId: data.userId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(400);
                chai.expect(res.body.message).to.equal('user not exist , please sign up first !');
                done();
            })
    });

    it('it should return 417 if FCM could not send push notification', (done) => {
        chai.
            request(app)
            .post('/sendPartnerRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ userId: data.userId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(417);
                chai.expect(res.body.message).to.equal('unable to send notification !');
                done();
            })
    });

});

describe('___________declineMatchRequest___________', () => {

    it('it should return 200 if removed request from user list, send rejection email , save rejection notification and send push notification', (done) => {
        chai.
            request(app)
            .post('/declineMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.declineMatchRequestObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

    it('it should return 401 if the id was not valid', (done) => {
        chai.
            request(app)
            .post('/declineMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.declineMatchRequestObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(401);
                chai.expect(res.body.message).to.equal('Not Authorized !');
                done();
            })
    });

    it('it should return 417 if FCM could not send push notification', (done) => {
        chai.
            request(app)
            .post('/declineMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.declineMatchRequestObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(417);
                chai.expect(res.body.message).to.equal('unable to send notification !');
                done();
            })
    });

    it('it should return 500 if there any error in performing logic in queries', (done) => {
        chai.
            request(app)
            .post('/declineMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.declineMatchRequestObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(500);
                chai.expect(res.body.message).to.equal('error');
                done();
            })
    });

});

describe('___________acceptMatchRequest___________', () => {

    it('should return 200 if update user1 and user2, create relationship and send push notification ', (done) => {
        chai.
            request(app)
            .post('/acceptMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ partner2Id: data.partner2Id, nationalId: data.nationalId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

    it('it should return 401 if the id was not valid', (done) => {
        chai.
            request(app)
            .post('/acceptMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ partner2Id: data.partner2Id, nationalId: data.nationalId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(401);
                chai.expect(res.body.message).to.equal('Not Authorized !');
                done();
            })
    });

    it('it should return 417 if FCM could not send push notification', (done) => {
        chai.
            request(app)
            .post('/acceptMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ partner2Id: data.partner2Id, nationalId: data.nationalId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(417);
                chai.expect(res.body.message).to.equal('unable to send notification !');
                done();
            })
    });

    it('should return 500 if there is any error in performing logic in queries', (done) => {
        chai.
            request(app)
            .post('/acceptMatchRequest')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ partner2Id: data.partner2Id, nationalId: data.nationalId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(500);
                chai.expect(res.body.message).to.equal('error');
                done();
            })
    });

});

describe('___________disMatchWithPartner___________', () => {

    it('should return 200 if update users data and update rate for user who attempt the dismatch', (done) => {
        chai.
            request(app)
            .post('/disMatchWithPartner')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.disMatchWithPartnerObj)
            .query({ matchId: data.matchId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

    it('should return 404 if cannot find the relationship', (done) => {
        chai.
            request(app)
            .post('/disMatchWithPartner')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.disMatchWithPartnerObj)
            .query({ matchId: data.matchId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(404);
                chai.expect(res.body.message).to.equal(`can't find relationship !`);
                done();
            })

    });

    it('should return 500 if there is error in performing logic in queries', (done) => {
        chai.
            request(app)
            .post('/disMatchWithPartner')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.disMatchWithPartnerObj)
            .query({ matchId: data.matchId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(500);
                chai.expect(res.body.message).to.equal('error');
                done();
            })
    });


});