const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user')
const Post = require('../models/post');
const FeedController = require('../controllers/feed')

describe('Feed Controller Tests', function () {
    before( function(done) {
        mongoose
            .connect('mongodb+srv://oscar:node_181194@cluster0.dmlrz.mongodb.net/test-messages?retryWrites=true&w=majority')
            .then(() => {
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
                done();
            })
    });

    it('should add a created post to the posts of the creator', function(done) {

        const req = {
            body: {
                title: 'test post',
                content: 'a test post'
            },
            file: {
                path: 'abc'
            },
            userId: '62e244a8f1ef060004b83930'
        }

        const res = {
            status: function() {return this},
            json: function() {}
        }

        FeedController.createPost(req, res, () => {})
            .then((savedUser) => {
                expect(savedUser).to.have.property('posts');
                expect(savedUser.posts).to.have.length(1);
                done();
            })

    });

   

    after( function(done) {
        User.deleteMany({})
            .then(() => {
                mongoose.disconnect().then(() => {done()});
            })
        });
})