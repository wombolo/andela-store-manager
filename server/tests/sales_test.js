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


const deleteId = 5;
const getId = 2;

describe("Sales", () =>{
  describe('GET', function () {
    //Test to get all sales
    it('should get all sales records', function (done) {
      chai.request(app)
        .get('/api/v1/sales/')
        .set('access-token', genToken)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });

    //Test to get single sale
    it('should get a single sale record', function (done) {
      chai.request(app)
        .get(`/api/v1/sales/${getId}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });


    //Test to NOT get single sale
    it('should not get a single sale record', function (done) {
      const id = 6600;
      chai.request(app)
        .get(`/api/v1/sales/${id}`)
        .end((err,res) =>{
          res.should.have.status(400);
          done();
        })
    });

  });

  describe('POST', function () {
    //Test to add a new sale
    it('should add a new sale records', function (done) {
      let book =  {id: 4, product_id: 2, title: "Things fall apart", description: "Book written by Chinua Achebe", price: 42, quantity: 3};

      chai.request(app)
        .post('/api/v1/sales/')
        .set('access-token', genToken)
        .send(book)
        .end((err,res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Sale created Successfully');
          res.body.newSale.should.have.property('id');
          res.body.newSale.should.have.property('title');
          res.body.newSale.should.have.property('description');
          res.body.newSale.should.have.property('price');
          res.body.newSale.should.have.property('quantity');

          done();
        })
    });

    //Test to NOT add a new sale
    it('should NOT add a new sale records', function (done) {
      // const id = sales.length + 1;
      chai.request(app)
        .post('/api/v1/sales/')
        .end((err,res) =>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
    });

  });

  describe('DELETE', function () {
    //Test to delete single sale
    it('should delete a single sale record', function (done) {
      chai.request(app)
        .delete(`/api/v1/sales/${deleteId}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });

    //Test to NOT delete single sale
    it('should not delete a single sale record', function (done) {
      const id = 100000;
      chai.request(app)
        .delete(`/api/v1/sales/${id}`)
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