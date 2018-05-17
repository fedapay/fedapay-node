let expect = require('chai').expect;
let lib = require('../dist/index.js');
const nock = require('nock');
const response = require('./mocks/currency.response');

describe('CurrencyTest', () => {

    beforeEach(() => {
        nock('https://sdx-api.fedapay.com')
            .get('/v1/currencies')
            .reply(200, response);
    });

    it('should return currencies', () => {
        lib.Currency.all().then(currencies => {
            expect(typeof currencies).to.equal('object');
        });
    });
});