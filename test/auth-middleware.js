const authMiddleware = require('../middleware/is-auth');

const { expect } = require('chai');

describe('Auth Middleware', function () {
    it('should throw an error if no authorisation header is present', function () {

        const req = {
            get: function() {
                return null;
            }
        }

        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');

    });

    it('should throw an error if the auth header has no spaces', function() {

        const req = {
            get: function(headerName) {
                return 'xyz'
            }
        }

        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('');
    })
})