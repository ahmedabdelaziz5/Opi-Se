const app = require('../app');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const data = require('./tmpData');
let token ;


describe('__________signUp__________', () => {

    it('should return status 201', (done) => {
        chai
        .request(app)
        .post('/signUp')
        .send(data.signUpObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("success");
            chai.expect(201);
            done();
        });
    })    

    it.only('should return status 409 if user already exist', (done) => {
        chai
        .request(app)
        .post('/signUp')
        .send(data.signUpObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("user already exist !");
            chai.expect(409);
            done();
        });
    })    

    it('should return status 400 if pass and confirmPass does not match', (done) => {
        chai
        .request(app)
        .post('/signUp')
        .send(data.signUpObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("password and confirm password not match !");
            chai.expect(400);
            done();
        });
    })   

    it('should return status 400 if did not save the user', (done) => {
        chai
        .request(app)
        .post('/signUp')
        .send(data.signUpObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("user not added !");
            chai.expect(400);
            done();
        });
    })    

    it('should return status 400 if did not send verifyication email', (done) => {
        chai
        .request(app)
        .post('/signUp')
        .send(data.signUpObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("could not send your email");
            chai.expect(400);
            done();
        });
    })    
 
})

describe.only('__________login__________', () => {

    it('should return status 200 if user can login', (done) => {
        chai
        .request(app)
        .post('/login')
        .send(data.loginObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("success");
            chai.expect(res.body.token).to.be.a('string');
            chai.expect(200);
            token = res.body.token;
            done();
        });
    })    

    it('should return status 400 if user not exist', (done) => {
        chai
        .request(app)
        .post('/login')
        .send(data.loginObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("user not exist , please sign up first !");
            chai.expect(400);
            done();
        });
    })    

    it('should return status 400 if user did not verify his account', (done) => {
        chai
        .request(app)
        .post('/login')
        .send(data.loginObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("please verify your account first !");
            chai.expect(400);
            done();
        });
    })   

    it.only('should return status 400 if user used incorrect password', (done) => {
        chai
        .request(app)
        .post('/login')
        .send(data.loginObj)
        .end((err, res) => {
            chai.expect(err).to.equal(null);
            chai.expect(res.body.message).to.equal("wrong password !");
            chai.expect(400);
            done();
        });
    })    
 
})