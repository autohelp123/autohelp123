// test/index.test.js

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../index'); // Adjust the path if your app.js is located elsewhere

describe('GET /', function() {
    it('should return Hello, World!', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.text).to.equal('Hello, World!');
                done();
            });
    });
});

describe('GET /users', function() {
    it('should return an array of users', function(done) {
        request(app)
            .get('/users')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.above(0);
                done();
            });
    });
});

describe('GET /users/:id', function() {
    it('should return a user object with the given id', function(done) {
        const userId = 1;
        request(app)
            .get(`/users/${userId}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.equal(userId);
                done();
            });
    });
});

describe('POST /users', function() {
    it('should create a new user and return it', function(done) {
        const newUser = { name: 'New User' };
        request(app)
            .post('/users')
            .send(newUser)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.equal(newUser.name);
                expect(res.body.id).to.be.a('number');
                done();
            });
    });
});

describe('PUT /users/:id', function() {
    it('should update the user with the given id', function(done) {
        const userId = 1;
        const updatedUser = { name: 'Updated User' };
        request(app)
            .put(`/users/${userId}`)
            .send(updatedUser)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.equal(updatedUser.name);
                expect(res.body.id).to.equal(userId);
                done();
            });
    });
});

describe('DELETE /users/:id', function() {
    it('should delete the user with the given id', function(done) {
        const userId = 1;
        request(app)
            .delete(`/users/${userId}`)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});