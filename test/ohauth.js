if (typeof require !== 'undefined') {
    expect = require('expect');
}

describe('ohauth', function() {
    describe('#qsString', function() {
        it('turns an object into a querystring', function() {
            expect(ohauth.qsString({ foo: 1 })).to.eql('foo=1');
        });
    });
});
