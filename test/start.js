const { expect } = require('chai');

describe('Dummy tests', function () {
    it('is a stupid test', function () {
        const a = 2;
        const b = 3;

        expect(b - a).to.equal(1);
    })
    it('is also a stupid test', function () {
        const a = 2;
        const b = 3;

        expect(b + a).to.equal(5);
    })
})