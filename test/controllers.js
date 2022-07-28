const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user')
const AuthController = require('../controllers/auth')

describe('Auth Controller Login Tests', function () {

    it('should throw an error if accessing the database fails', function (done) {
        
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: "test@test.com",
                password: "1234"
            }
        }

        AuthController.login(req, {} , () => {})
            .then(result => {
                expect(result).to.be.an('error');
                expect(result).to.have.property('statusCode', 500);
                done();
            })

        User.findOne.restore();

    });

    it('should send a response with a valid user status for an existing user', function(done) {
        mongoose
            .connect('mongodb+srv://oscar:node181194@cluster0.dmlrz.mongodb.net/test-messages?retryWrites=true&w=majority')
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'tester',
                    name: 'Test',
                    posts: [],
                    _id: '62e244a8f1ef060004b83930'
                })

                return user.save();
            })
            .then(() => {
                const req = {
                    userId: '62e244a8f1ef060004b83930'
                }
                const res = {
                    statusCode: 500,
                    userStatus: null,
                    status: function (code) {
                        this.statusCode = code;
                        return this;
                    },
                    json: function(data) {
                        this.userStatus = data.status;
                    }
                };
                AuthController.getUserStatus(req, res, () => {})
                    .then(() => {
                        expect(res.statusCode).to.be.equal(200);
                        expect(res.userStatus).to.be.equal('I am new!');
                        done();
                    })
            })
            .catch(err => {
                console.log(err);
            })

    });
})