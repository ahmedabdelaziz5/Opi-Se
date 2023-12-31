const chai = require('chai');
const app = require('../app');
const data = require('./tmpData');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('___________getAllNotes___________', () => {

    it('should return status 200 and partnerRequests array', (done) => {
        chai.
            request(app)
            .get('/getAllNotes')
            .set('Authorization', `Bearer ${data.token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                chai.expect(res.body.message).to.equal('success');
                done();
            })
    });

});
