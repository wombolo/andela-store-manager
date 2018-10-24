import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import profiles from "../database/profiles";

//Configure chai
chai.use(chaiHttp);
chai.should();


describe("Profiles", () =>{
    describe('GET', function () {
        //Test to get all profiles
        it('should get all profiles records', function (done) {
            chai.request(app)
                .get('/api/v1/profiles/')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        //Test to get single profile
        it('should get a single profile record', function (done) {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/profiles/${id}`)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });


        //Test to NOT get single profile
        it('should not get a single profile record', function (done) {
            const id = 6;
            chai.request(app)
                .get(`/api/v1/profiles/${id}`)
                .end((err,res) =>{
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('PUT', function () {
        //Test to update single profile
        it('should update a single profile record', function (done) {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/profiles/${id}`)
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
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('POST', function () {
        //Test to add a new profile
        it('should add a new profile records', function (done) {
            let profile = {id: 1, firstname: "Marilyn", lastname: "Cole", role: "admin", image: "images/pix1.png"};

            chai.request(app)
                .post('/api/v1/profiles/')
                .send(profile)
                .end((err,res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('profile created Successfully');
                    res.body.new_profile.should.have.property('id');
                    res.body.new_profile.should.have.property('firstname');
                    res.body.new_profile.should.have.property('lastname');
                    res.body.new_profile.should.have.property('role');
                    res.body.new_profile.should.have.property('image');
                    done();
                })
        });

        //Test to NOT add a new profile
        it('should NOT add a new profile records', function (done) {
            // const id = profiles.length + 1;
            chai.request(app)
                .post('/api/v1/profiles/')
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
            const id = 1;
            chai.request(app)
                .delete(`/api/v1/profiles/${id}`)
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
                    res.should.have.status(404);
                    done();
                })
        });

    });
});