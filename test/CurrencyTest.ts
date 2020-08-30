import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import { ApiConnectionError, Currency, FedaPayObject } from '../src';
import { exceptRequest, setUp, tearDown } from './utils';

describe('CurrencyTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should return currencies', async () => {
        let body = {
            'v1/currencies': [{
                'id': 1,
                'klass': 'v1/currency',
                'name': 'FCFA',
                'iso': 'XOF',
                'code': 952,
                'prefix': null,
                'suffix': 'CFA',
                'div': 1,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }]
        };

        nock(/fedapay\.com/)
            .get('/v1/currencies')
            .reply(200, body);

        let object = await Currency.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/currencies',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.currencies[0]).to.be.instanceof(Currency);
        expect(object.currencies[0].name).to.equal('FCFA');
        expect(object.currencies[0].iso).to.equal('XOF');
        expect(object.currencies[0].code).to.equal(952);
        expect(object.currencies[0].prefix).to.equal(null);
        expect(object.currencies[0].suffix).to.equal('CFA');
        expect(object.currencies[0].div).to.equal(1);
    });

    it('should retrieve a currency', async () => {
        let body = {
            'v1/currency': {
                'id': 1,
                'klass': 'v1/currency',
                'name': 'FCFA',
                'iso': 'XOF',
                'code': 952,
                'prefix': null,
                'suffix': 'CFA',
                'div': 1,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/currencies/1')
            .reply(200, body);

        let currency = await Currency.retrieve(1);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/currencies/1',
            method: 'get'
        });

        expect(currency).to.be.instanceof(Currency);
        expect(currency.name).to.equal('FCFA');
        expect(currency.iso).to.equal('XOF');
        expect(currency.code).to.equal(952);
        expect(currency.prefix).to.equal(null);
        expect(currency.suffix).to.equal('CFA');
        expect(currency.div).to.equal(1);
    });
});
