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


const deleteId = 6;
const getId = 3;

describe("Products", () =>{
  describe('GET', function () {

    //Test to get all products
    it('should get all products records', function (done) {
      chai.request(app)
        .get('/api/v1/products/')
        .set('access-token', genToken)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });

    //Test to get single product
    it('should get a single product record', function (done) {
      chai.request(app)
        .get(`/api/v1/products/${getId}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });


    //Test to NOT get single product
    it('should not get a single product record', function (done) {
      const id = 600000;
      chai.request(app)
        .get(`/api/v1/products/${id}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(404);
          done();
        })
    });

  });

  describe('PUT', function () {
    //Test to update single product
    it('should update a single product record', function (done) {
      let product = {id: 2, title: "Things fall apart", image: "default_pix.png", description: "Book written by Chinua Achebe", price: "42.00", quantity: 3, status: "active",};

      chai.request(app)
        .put(`/api/v1/products/${getId}`)
        .set('access-token', genToken)
        .send(product)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });


    //Test to NOT update single product
    it('should not update a single product record', function (done) {
      const id = 60000;
      chai.request(app)
        .get(`/api/v1/products/${id}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(404);
          done();
        })
    });

  });

  describe('POST', function () {
    //Test to add a new product
    it('should add a new product records', function (done) {
      let book =  {id: 4, title: "Things fall apart", description: "Book written by Chinua Achebe", price: 42, quantity: 3};

      chai.request(app)
        .post('/api/v1/products/')
        .set('access-token', genToken)
        .send(book)
        .end((err,res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Product created Successfully');
          res.body.new_product.should.have.property('id');
          res.body.new_product.should.have.property('title');
          res.body.new_product.should.have.property('description');
          res.body.new_product.should.have.property('price');
          res.body.new_product.should.have.property('quantity');

          done();
        })
    });

    //Test to NOT add a new product
    it('should NOT add a new product records', function (done) {
      // const id = products.length + 1;
      chai.request(app)
        .post('/api/v1/products/')
        .end((err,res) =>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
    });

  });

  describe('DELETE', function () {
    //Test to delete single product
    it('should delete a single product record', function (done) {
      chai.request(app)
        .delete(`/api/v1/products/${deleteId}`)
        .set('access-token', genToken)
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });

    //Test to NOT delete single product
    it('should not delete a single product record', function (done) {
      const id = 10;
      chai.request(app)
        .delete(`/api/v1/products/${id}`)
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