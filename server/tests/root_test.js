import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

// Configure chai
chai.use(chaiHttp);
chai.should();


describe('Server.js Root endpoints', () => {
  describe('GET', () => {
    // Test to get all sales
    it('should get welcome message', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test to get a 404 error message
    it('should get a 404 error message', (done) => {
      chai.request(app)
        .get(`/asgpibal_s`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});