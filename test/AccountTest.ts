import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import * as faker from 'faker';
import { ApiConnectionError, Account, FedaPayObject } from '../src';
import { setUp, tearDown, exceptRequest } from './utils';

describe('AccountTest', () => {
    beforeEach(setUp);
    afterEach(tearDown);

    it('should return accounts', async () => {
        let body = {
            'v1/accounts': [{
                'country': 'BJ',
                'created_at': '2018-03-12T09:09:03.969Z',
                'id': 1,
                'klass': 'v1/account',
                'name': 'Test account',
                'timezone': 'UTC',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }]
        };

        nock(/fedapay\.com/)
            .get('/v1/accounts')
            .reply(200, body);

        let object = await Account.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/accounts',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.accounts[0]).to.be.instanceof(Account);
        expect(object.accounts[0].country).to.equal('BJ');
        expect(object.accounts[0].created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.accounts[0].id).to.equal(1);
        expect(object.accounts[0].klass).to.equal('v1/account');
        expect(object.accounts[0].name).to.equal('Test account');
        expect(object.accounts[0].timezone).to.equal('UTC');
        expect(object.accounts[0].updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should retrieve a account', async () => {
        let body = {
            'v1/account': {
                'id': 1,
                'country': 'BJ',
                'created_at': '2018-03-12T09:09:03.969Z',
                'klass': 'v1/account',
                'name': 'Test account',
                'timezone': 'UTC',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/accounts/1')
            .reply(200, body);

        let account = await Account.retrieve(1);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/accounts/1',
            method: 'get'
        });

        expect(account).to.be.instanceof(Account);
        expect(account.id).to.equal(1);
        expect(account.country).to.equal('BJ');
        expect(account.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(account.klass).to.equal('v1/account');
        expect(account.name).to.equal('Test account');
        expect(account.timezone).to.equal('UTC');
        expect(account.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should failed account creation', async () => {

        let data = {
            'firstname': faker.name.firstName(),
        };

        let body = {
            'message': 'Account creation failed',
            'errors' : {
                'name': 'name field required'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/accounts')
            .reply(200, body);


        try {
            let account = await Account.create(data);
        } catch (e) {
            exceptRequest({
                url: 'https://sandbox-api.fedapay.com/v1/accounts',
                data: JSON.stringify(data),
                method: 'post'
            });
            expect(e).to.be.instanceof(ApiConnectionError);
            expect(e.hasErrors()).to.be.true;
            expect(e.errorMessage).to.not.be.null;
            expect(e.errors).to.have.keys('name');
        }
    });

    it('should create account', async () => {
        let data = {
            name: faker.name.firstName()
        };

        let body = {
            'v1/account': {
                'country': 'BJ',
                'created_at': '2018-03-12T09:09:03.969Z',
                'id': 1,
                'klass': 'v1/account',
                'name': data.name,
                'timezone': 'UTC',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/accounts')
            .reply(200, body);

        let account = await Account.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/accounts',
            data: JSON.stringify(data),
            method: 'post'
        });

        expect(account).to.be.instanceof(Account);
        expect(account.country).to.equal('BJ');
        expect(account.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(account.klass).to.equal('v1/account');
        expect(account.name).to.equal(data.name);
        expect(account.timezone).to.equal('UTC');
        expect(account.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should retrieve account', async () => {
        let body = {
            'v1/account': {
                'country': 'BJ',
                'created_at': '2018-03-12T09:09:03.969Z',
                'id': 1,
                'klass': 'v1/account',
                'name': 'account name',
                'timezone': 'UTC',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/accounts/1')
            .reply(200, body);

        let account = await Account.retrieve(1);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/accounts/1',
            method: 'get'
        });

        expect(account).to.be.instanceof(Account);
        expect(account.country).to.equal('BJ');
        expect(account.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(account.klass).to.equal('v1/account');
        expect(account.name).to.equal('account name');
        expect(account.timezone).to.equal('UTC');
        expect(account.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should update account', async () => {
        let data = {
            'name': 'Updated name'
        };

        let body = {
            'v1/account': {
                'country': 'BJ',
                'created_at': '2018-03-12T09:09:03.969Z',
                'id': 1,
                'klass': 'v1/account',
                'name': data.name,
                'timezone': 'UTC',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .put('/v1/accounts/1')
            .reply(200, body);

        let account = await Account.update(1, data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/accounts/1',
            data: JSON.stringify(data),
            method: 'put'
        });

        expect(account).to.be.instanceof(Account);
        expect(account.country).to.equal('BJ');
        expect(account.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(account.klass).to.equal('v1/account');
        expect(account.name).to.equal(data.name);
        expect(account.timezone).to.equal('UTC');
        expect(account.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should delete account', async () => {
        let data = {
            name: faker.name.firstName()
        };

        let body = {
            'v1/account': {
                'country': 'BJ',
                'created_at': '2018-03-12T09:09:03.969Z',
                'id': 1,
                'klass': 'v1/account',
                'name': data.name,
                'timezone': 'UTC',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/accounts')
            .reply(200, body);

        let account = await Account.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/accounts',
            data: JSON.stringify(data),
            method: 'post'
        });

        nock(/fedapay\.com/)
            .delete('/v1/accounts/1')
            .reply(200);

        await account.delete();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/accounts/1',
            method: 'delete'
        });
    });

});
