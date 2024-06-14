const chai = require('chai');
const app = require('../app');
const data = require('./tmpData');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let token;
const jwt = require('jsonwebtoken');
token = jwt.sign({ email: "ahmedabdelaziz123@gmail.com" }, process.env.SECRET_JWT);


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
    });

    it('should return status 409 if user already exist', (done) => {
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
    });

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
    });

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
    });

    it('should return status 400 if did not send verification email', (done) => {
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
    });

});

describe('__________login__________', () => {

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
    });

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
    });

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
    });

    it('should return status 400 if user used incorrect password', (done) => {
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
    });

});

describe('__________forgetPassword__________', () => {

    it('should return status 200 if email was sent successfully', (done) => {
        chai
            .request(app)
            .post('/forgetPassword')
            .send(data.forgetPasswordObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("success and your email was sent !");
                chai.expect(200);
                done();
            });
    });

    it('should return status 400 if user not exist', (done) => {
        chai
            .request(app)
            .post('/forgetPassword')
            .send(data.forgetPasswordObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("user not exist , please sign up first !");
                chai.expect(400);
                done();
            });
    });

    it('should return status 400 if could not send email', (done) => {
        chai
            .request(app)
            .post('/forgetPassword')
            .send(data.forgetPasswordObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("could not send your email");
                chai.expect(400);
                done();
            });
    });

    it('should return status 500 if unexpected error happened', (done) => {
        chai
            .request(app)
            .post('/forgetPassword')
            .send(data.forgetPasswordObj)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("unexpected error");
                chai.expect(500);
                done();
            });
    });

});

describe('__________submitNewPassword__________', () => {

    it('should return status 200 if can reset password', (done) => {
        chai
            .request(app)
            .post('/submitNewPassword')
            .send(data.submitNewPasswordObj)
            .query({ token })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("success");
                chai.expect(201);
                done();
            });
    });

    it('should return status 400 if pass and cPass do not match', (done) => {
        chai
            .request(app)
            .post('/submitNewPassword')
            .send(data.submitNewPasswordObj)
            .query({ token })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("password and confirm password not match !");
                chai.expect(400);
                done();
            });
    });

    it('should return status 400 if user not exist', (done) => {
        chai
            .request(app)
            .post('/submitNewPassword')
            .send(data.submitNewPasswordObj)
            .query({ token })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("user not exist , please sign up first !");
                chai.expect(400);
                done();
            });
    });

});

describe('__________changePassword__________', () => {

    it('should return status 201 if can password changed', (done) => {
        chai
            .request(app)
            .post('/changePassword')
            .send(data.changePasswordObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("success");
                chai.expect(201);
                done();
            });
    });

    it('should return status 400 if pass and cPass do not match', (done) => {
        chai
            .request(app)
            .post('/changePassword')
            .send(data.changePasswordObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("new password and confirm new password not match !")
                chai.expect(400);
                done();
            });
    });

    it('should return status 400 if user not exist', (done) => {
        chai
            .request(app)
            .post('/changePassword')
            .send(data.changePasswordObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("user not exist , please sign up first !");
                chai.expect(400);
                done();
            });
    });

    it('should return status 400 if password was not correct', (done) => {
        chai
            .request(app)
            .post('/changePassword')
            .send(data.changePasswordObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("wrong password !");
                chai.expect(400);
                done();
            });
    });

});

describe('__________editProfile__________', () => {

    it('should return status 201 if can edit profile', (done) => {
        chai
            .request(app)
            .patch('/editProfile')
            .send(data.editProfileObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("success");
                chai.expect(201);
                done();
            });
    });

    it('should return status 400 if user not exist', (done) => {
        chai
            .request(app)
            .patch('/editProfile')
            .send(data.editProfileObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("user not exist , please sign up first !");
                chai.expect(400);
                done();
            });
    });

    it('should return status 409 if email was already taken', (done) => {
        chai
            .request(app)
            .patch('/editProfile')
            .send(data.editProfileObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("email is already exist !");
                chai.expect(409);
                done();
            });
    });

    it('should return status 400 if userName was already taken', (done) => {
        chai
            .request(app)
            .patch('/editProfile')
            .send(data.editProfileObj)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("user name is already taken !");
                chai.expect(400);
                done();
            });
    });

});

describe('__________changeProfileImage__________', () => {

    it('should return status 200 if profile image was edited', (done) => {
        chai
            .request(app)
            .post('/changeProfileImage')
            .set({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            })
            .attach('userImage', './jok.jpg')
            .field('type', 'remove')
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("success");
                chai.expect(200);
                done();
            });
    });

    it('should return status 400 if type is !remove and !upload', (done) => {
        chai
            .request(app)
            .post('/changeProfileImage')
            .set({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            })
            .attach('userImage', './jok.jpg')
            .field('type', '')
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("Not Authorized !");
                chai.expect(400);
                done();
            });
    });

    it('should return status 500 if can not change photo', (done) => {
        chai
            .request(app)
            .post('/changeProfileImage')
            .set({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            })
            .attach('userImage', './jok.jpg')
            .field('type', 'upload')
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("something went wrong !");
                chai.expect(500);
                done();
            });
    });

});

describe('__________verifyAccount__________', () => {

    it('should return status 201 if profile was verified successfully', (done) => {
        chai
            .request(app)
            .get('/verifyAccount')
            .query({ token })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(200);
                done();
            });
    });

    it('should return status 400 if user not exist', (done) => {
        chai
            .request(app)
            .get('/verifyAccount')
            .query({ token })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(400);
                done();
            });
    });

});

