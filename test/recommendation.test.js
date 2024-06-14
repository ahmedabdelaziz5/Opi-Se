const chai = require('chai');
const app = require('../app');
const data = require('./tmpData');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('___________getPartnerRecommendation___________', () => {

    it('should return status 200 and recommendation array size=5', (done) => {
        chai
            .request(app)
            .get('/getPartnerRecommendation')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ page: 1 })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });
    it('should return status 200 no recommendations message', (done) => {
        chai
            .request(app)
            .get('/getPartnerRecommendation')
            .set('Authorization', `Bearer ${data.token}`)
            .query({ page: 1 })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('there is no recommendations yet !');
                done();
            })
    });

});

describe('___________submitUserPrefers___________', () => {

    it('should return status 200', (done) => {
        chai
            .request(app)
            .post('/submitUserPrefers')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.submitUserPrefersObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(201);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

    it('should return status 400 if cannot get online recommendation ', (done) => {
        chai
            .request(app)
            .post('/submitUserPrefers')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.submitUserPrefersObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(400);
                chai.expect(res.body.message).to.equal('could not get partner recommendation for you !');
                done();
            })
    });

    it('should return status 400 if user not exist', (done) => {
        chai
            .request(app)
            .post('/submitUserPrefers')
            .set('Authorization', `Bearer ${data.token}`)
            .send(data.submitUserPrefersObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(400);
                chai.expect(res.body.message).to.equal('user not exist , please sign up first !');
                done();
            })
    });


});