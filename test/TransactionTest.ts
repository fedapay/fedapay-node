import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import { Transaction, FedaPayObject } from '../src';
import { exceptRequest, setUp, tearDown } from './utils';

describe('TransactionTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should return transaction', async () => {
        let body = {
            'v1/transactions': [{
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': 100,
                'description': 'Description',
                'callback_url': 'http://e-shop.com',
                'status': 'pending',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }],
            'meta': { 'page': 1 }
        };

        nock(/fedapay\.com/)
            .get('/v1/transactions')
            .reply(200, body);

        let object = await Transaction.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.meta).to.be.instanceof(FedaPayObject);
        expect(object.transactions[0]).to.be.instanceof(Transaction);
        expect(object.transactions[0].id).to.equal(1);
        expect(object.transactions[0].klass).to.equal('v1/transaction');
        expect(object.transactions[0].transaction_key).to.equal('0KJAU01');
        expect(object.transactions[0].reference).to.equal('109329828');
        expect(object.transactions[0].amount).to.equal(100);
        expect(object.transactions[0].description).to.equal('Description');
        expect(object.transactions[0].callback_url).to.equal('http://e-shop.com');
        expect(object.transactions[0].status).to.equal('pending');
        expect(object.transactions[0].customer_id).to.equal(1);
        expect(object.transactions[0].currency_id).to.equal(1);
        expect(object.transactions[0].mode).to.equal('mtn');
        expect(object.transactions[0].created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.transactions[0].updated_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.transactions[0].paid_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should retrieve a transaction', async () => {
        let body = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': 100,
                'description': 'Description',
                'callback_url': 'http://e-shop.com',
                'status': 'pending',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/transactions/1')
            .reply(200, body);

        let transaction = await Transaction.retrieve(1);
        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions/1',
            method: 'get'
        });

        expect(transaction).to.be.instanceof(FedaPayObject);
        expect(transaction).to.be.instanceof(Transaction);
        expect(transaction.id).to.equal(1);
        expect(transaction.klass).to.equal('v1/transaction');
        expect(transaction.transaction_key).to.equal('0KJAU01');
        expect(transaction.reference).to.equal('109329828');
        expect(transaction.amount).to.equal(100);
        expect(transaction.description).to.equal('Description');
        expect(transaction.callback_url).to.equal('http://e-shop.com');
        expect(transaction.status).to.equal('pending');
        expect(transaction.customer_id).to.equal(1);
        expect(transaction.currency_id).to.equal(1);
        expect(transaction.mode).to.equal('mtn');
        expect(transaction.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(transaction.updated_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(transaction.paid_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should create transaction', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/transactions')
            .reply(200, body);

        let transaction = await Transaction.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions',
            data: JSON.stringify(data),
            method: 'post'
        });

        expect(transaction).to.be.instanceof(FedaPayObject);
        expect(transaction).to.be.instanceof(Transaction);
        expect(transaction.id).to.equal(1);
        expect(transaction.klass).to.equal('v1/transaction');
        expect(transaction.transaction_key).to.equal('0KJAU01');
        expect(transaction.reference).to.equal('109329828');
        expect(transaction.amount).to.equal(1000);
        expect(transaction.description).to.equal('description');
        expect(transaction.callback_url).to.equal('http://e-shop.com');
        expect(transaction.status).to.equal('pending');
        expect(transaction.customer_id).to.equal(1);
        expect(transaction.currency_id).to.equal(1);
        expect(transaction.mode).to.equal('mtn');
        expect(transaction.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(transaction.updated_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(transaction.paid_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should delete transaction', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/transactions')
            .reply(200, body);

        let transaction = await Transaction.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions',
            data: JSON.stringify(data),
            method: 'post'
        });

        nock(/fedapay\.com/)
            .delete('/v1/transactions/1')
            .reply(200);

        await transaction.delete();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions/1',
            method: 'delete'
        });
    });

    it('should update transaction', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .put('/v1/transactions/1')
            .reply(200, body);

        let transaction = await Transaction.update(1, data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions/1',
            data: JSON.stringify(data),
            method: 'put'
        });

        expect(transaction).to.be.instanceof(FedaPayObject);
        expect(transaction).to.be.instanceof(Transaction);
        expect(transaction.id).to.equal(1);
        expect(transaction.klass).to.equal('v1/transaction');
        expect(transaction.transaction_key).to.equal('0KJAU01');
        expect(transaction.reference).to.equal('109329828');
        expect(transaction.amount).to.equal(1000);
        expect(transaction.description).to.equal('description');
        expect(transaction.callback_url).to.equal('http://e-shop.com');
        expect(transaction.status).to.equal('pending');
        expect(transaction.customer_id).to.equal(1);
        expect(transaction.currency_id).to.equal(1);
        expect(transaction.mode).to.equal('mtn');
        expect(transaction.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(transaction.updated_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(transaction.paid_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should update transaction with save', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/transactions')
            .reply(200, body);

        let transaction = await Transaction.create(data);
        let updateData = transaction.serializeParameters();

        transaction.amount = 18500;

        nock(/fedapay\.com/)
            .put('/v1/transactions/1')
            .reply(200, body);

        await transaction.save();

        updateData.amount = 18500;

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions/1',
            data: JSON.stringify(updateData),
            method: 'put'
        });
    });

    it('should generate transaction token', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body: any = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/transactions')
            .reply(200, body);

        let transaction = await Transaction.create(data);

        body = {
            'token': 'PAYEMENT_TOKEN',
            'url': 'https://process.fedapay.com/PAYEMENT_TOKEN'
        };
        nock(/fedapay\.com/)
            .post('/v1/transactions/1/token')
            .reply(200, body);

        const tokenObject = await transaction.generateToken();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions/1/token',
            method: 'post'
        });

        expect(tokenObject).to.be.instanceof(FedaPayObject);
        expect(tokenObject.token).to.equal('PAYEMENT_TOKEN');
        expect(tokenObject.url).to.equal('https://process.fedapay.com/PAYEMENT_TOKEN');
    });

    it('should send transaction now with token', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body: any = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/transactions')
            .reply(200, body);

        let transaction = await Transaction.create(data);

        body = { 'message': 'success' };
        nock(/fedapay\.com/)
            .post('/v1/mtn')
            .reply(200, body);

        const object = await transaction.sendNowWithToken('mtn', 'PAYEMENT_TOKEN');

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/mtn',
            method: 'post'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.message).to.equal('success');
    });

    it('should send transaction now by generating token', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body: any = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/transactions')
            .reply(200, body);

        let transaction = await Transaction.create(data);

        body = { 'token': 'PAYEMENT_TOKEN' };
        nock(/fedapay\.com/)
            .post('/v1/transactions/1/token')
            .reply(200, body);

        body = { 'message': 'success' };
        nock(/fedapay\.com/)
            .post('/v1/mtn')
            .reply(200, body);

        const object = await transaction.sendNow('mtn');

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/mtn',
            method: 'post'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.message).to.equal('success');
    });

    it('should send transaction fees request', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'description': 'description',
            'callback_url': 'http://e-shop.com',
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body: any = {
            'v1/transaction': {
                'id': 1,
                'klass': 'v1/transaction',
                'transaction_key': '0KJAU01',
                'reference': '109329828',
                'amount': data.amount,
                'description': data.description,
                'callback_url': data.callback_url,
                'status': 'pending',
                'customer_id': data.customer.id,
                'currency_id': 1,
                'mode': 'mtn',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
                'paid_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/transactions')
            .reply(200, body);

        let transaction = await Transaction.create(data);

        body = {
            amount_debited: 51020,
            amount_transferred: 50000,
            apply_fees_to_merchant: false,
            commission: 0.02,
            fees: 1020,
            fixed_commission: 0,
            message: "{fees} de frais supplémentaires sont appliqués sur votre paiement."
        };
        nock(/fedapay\.com/)
            .get('/v1/transactions/fees?token=token&mode=mtn')
            .reply(200, body);

        const object = await transaction.getFees('token', 'mtn');

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/transactions/fees',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.amount_debited).to.equal(51020);
        expect(object.amount_transferred).to.equal(50000);
        expect(object.apply_fees_to_merchant).to.false;
    });
});
