import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import { Balance, FedaPayObject } from '../src';
import { exceptRequest, setUp, tearDown } from './utils';

describe('BalanceTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should return balances', async () => {
        let body = {
            'v1/balances': [{
                'id': 1,
                'klass': 'v1/balance',
                'currency_id': 1,
                'account_id': 1,
                'amount': 952,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }]
        };

        nock(/fedapay\.com/)
            .get('/v1/balances')
            .reply(200, body);

        let object = await Balance.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/balances',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.balances[0]).to.be.instanceof(Balance);
        expect(object.balances[0].currency_id).to.equal(1);
        expect(object.balances[0].account_id).to.equal(1);
        expect(object.balances[0].amount).to.equal(952);
        expect(object.balances[0].mode).to.equal('mtn');
    });

    it('should retrieve a balance', async () => {
        let body = {
            'v1/balance': {
                'id': 1,
                'klass': 'v1/balance',
                'currency_id': 1,
                'account_id': 1,
                'amount': 952,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/balances/1')
            .reply(200, body);

        let balance = await Balance.retrieve(1);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/balances/1',
            method: 'get'
        });

        expect(balance).to.be.instanceof(Balance);
        expect(balance.currency_id).to.equal(1);
        expect(balance.account_id).to.equal(1);
        expect(balance.amount).to.equal(952);
        expect(balance.mode).to.equal('mtn');
    });
});
