const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

//Configure chai
chai.use(chaiHttp);
chai.should();

describe("Products", () =>{
    describe('GET', function () {
        //Test to get all products
        it('should get all products records', function (done) {
            chai.request(app)
                .get('/api/v1/products/')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        //Test to get single product
        it('should get a single student record', function (done) {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/product/${id}`)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });


        //Test to NOT get single product
        it('should not get a single student record', function (done) {
            const id = 6;
            chai.request(app)
                .get(`/api/v1/product/${id}`)
                .end((err,res) =>{
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('POST', function () {
        //Test to add a new product
        it('should add a new product records', function (done) {
            chai.request(app)
                .post('/api/v1/products/')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object').that.includes('product created');
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
                    res.body.should.be.a('object').that.includes('product not created');
                    done();
                })
        });

    });
});