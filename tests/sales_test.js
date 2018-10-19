// const {chai,app }= require('./test');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

//Configure chai
chai.use(chaiHttp);
chai.should();


describe("Sales", () =>{
    describe('GET', function () {
        //Test to get all sales
        it('should get all sales records', function (done) {
            chai.request(app)
                .get('/api/v1/sales/')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        //Test to get single sale
        it('should get a single sale record', function (done) {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/sale/${id}`)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });


        //Test to NOT get single sale
        it('should not get a single sale record', function (done) {
            const id = 6;
            chai.request(app)
                .get(`/api/v1/sale/${id}`)
                .end((err,res) =>{
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('PUT', function () {
        //Test to update single sale
        it('should update a single sale record', function (done) {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/sale/${id}`)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });


        //Test to NOT update single sale
        it('should not update a single sale record', function (done) {
            const id = 60000;
            chai.request(app)
                .get(`/api/v1/sale/${id}`)
                .end((err,res) =>{
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('POST', function () {
        //Test to add a new sale
        it('should add a new sale records', function (done) {
            let book =  {id: 4, title: "Things fall apart", description: "Book written by Chinua Achebe", price: '$42', quantity: '3'};

            chai.request(app)
                .post('/api/v1/sales/')
                .send(book)
                .end((err,res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('sale created Successfully');
                    res.body.new_product.should.have.property('id');
                    res.body.new_product.should.have.property('title');
                    res.body.new_product.should.have.property('description');
                    res.body.new_product.should.have.property('price');
                    res.body.new_product.should.have.property('quantity');

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
            const id = 1;
            chai.request(app)
                .delete(`/api/v1/sale/${id}`)
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
                .delete(`/api/v1/sale/${id}`)
                .end((err,res) =>{
                    res.should.have.status(404);
                    done();
                })
        });

    });
});