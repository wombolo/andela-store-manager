import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
let genToken;
//Configure chai
chai.use(chaiHttp);
chai.should();


const userCredentials = {
  email: 'abati1.cole@ini.net',
  password: '12345',
};

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send(userCredentials)
    .end((err, res) => {
      done();
      return genToken = res.body.token;
      // return app.set('access-token', res.body.token);
    });
});

const deleteId = 3;
const getId = 1;

describe("Profiles", () =>{
  describe('GET', function () {
    //Test to get all profiles
    it('should get all profiles records', function (done) {
      chai.request(app)
        .get('/api/v1/profiles/')
        .set('access-token', genToken)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });

    //Test to get single profile
    it('should get a single profile record', function (done) {
      chai.request(app)
        .get(`/api/v1/profiles/${getId}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });


    //Test to NOT get single profile
    it('should not get a single profile record', function (done) {
      const id = 66;
      chai.request(app)
        .get(`/api/v1/profiles/${id}`)
        .end((err,res) =>{
          res.should.have.status(400);
          done();
        })
    });

  });

  describe('PUT', function () {
    //Test to update single profile
    it('should update a single profile record', function (done) {
      let profile = {id: 1, firstname: "Akano", lastname: "Ade",email: 'abati1.cole@ini.net',  role: "admin", image: "images/pix1.png",password:'12345'};
      chai.request(app)
        .put(`/api/v1/profiles/${getId}`)
        .set('access-token', genToken)
        .send(profile)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });


    //Test to NOT update single profile
    it('should not update a single profile record', function (done) {
      const id = 60000;
      chai.request(app)
        .get(`/api/v1/profiles/${id}`)
        .end((err,res) =>{
          res.should.have.status(400);
          done();
        })
    });

  });

  describe('POST', function () {
    //Test to add a new profile
    it('should add a new profile record', function (done) {
      let rand = Math.random()*6;
      let randEmail = rand.toFixed(2) + 'mary.cole@ini.net';

      let profile = {id: 1, firstname: "Marilyn", lastname: "Cole",email: randEmail,  role: "admin", image: "images/pix1.png",password:'12345'};

      chai.request(app)
        .post('/api/v1/profiles/')
        .set('access-token', genToken)
        .send(profile)
        .end((err,res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('profile created Successfully');
          res.body.newProfile.should.have.property('id');
          res.body.newProfile.should.have.property('firstname');
          res.body.newProfile.should.have.property('lastname');
          res.body.newProfile.should.have.property('email');
          res.body.newProfile.should.have.property('role');
          res.body.newProfile.should.have.property('image');
          done();
        })
    });

    //Test to NOT add a new profile
    it('should NOT add a new profile records', function (done) {
      let profile = {id: 1, firstname: "Marilyn", lastname: "Cole", role: "admin", image: "images/pix1.png",password:'12345'};

      chai.request(app)
        .post('/api/v1/profiles/').send(profile)
        .end((err,res) =>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
    });

  });

  describe('DELETE', function () {
    //Test to delete single profile
    it('should delete a single profile record', function (done) {
      chai.request(app)
        .delete(`/api/v1/profiles/${deleteId}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });

    //Test to NOT delete single profile
    it('should not delete a single profile record', function (done) {
      const id = 100000;
      chai.request(app)
        .delete(`/api/v1/profiles/${id}`)
        .end((err,res) =>{
          res.should.have.status(400);
          done();
        })
    });

  });
});

after(() => {
  app.close();
});
