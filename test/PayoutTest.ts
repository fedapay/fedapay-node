import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import {
    Payout,
    FedaPayObject,
    Customer
} from '../src';
import { exceptRequest, setUp, tearDown } from './utils';

describe('PayoutTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    function createPayout() {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'amount': 5000,
            'include': 'customer,currency'
        };

        let body = {
            "v1/payout": {
                "klass": "v1/payout",
                "id": 1,
                "reference": "1540402065678",
                "amount": data.amount,
                "status": "pending",
                "customer_id": data.customer.id,
                "currency_id": 1,
                "mode": "mtn",
                "last_error_code": null,
                "last_error_message": null,
                "created_at": "2018-10-24T17:27:45.677Z",
                "updated_at": "2018-10-24T17:27:45.677Z",
                "scheduled_at": null,
                "sent_at": null,
                "failed_at": null,
                "deleted_at": null,
                "customer": {
                    "klass": "v1/customer",
                    "id": data.customer.id,
                    "firstname": "SOHOU",
                    "lastname": "Zidial",
                    "email": "zinsou@test.com",
                    "account_id": 1,
                    "created_at": "2018-10-17T16:03:24.061Z",
                    "updated_at": "2018-10-17T16:03:24.061Z"
                }
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/payouts')
            .reply(200, body);

        return Payout.create(data);
    }

    it('should return payouts', async () => {
        let body = {
            "v1/payouts": [
                {
                    "klass": "v1/payout",
                    "id": 16,
                    "reference": "1540316134325",
                    "amount": 2000,
                    "status": "pending",
                    "customer_id": 2,
                    "currency_id": 1,
                    "mode": "mtn",
                    "last_error_code": null,
                    "last_error_message": null,
                    "created_at": "2018-10-23T17:35:34.325Z",
                    "updated_at": "2018-10-23T17:35:34.325Z",
                    "scheduled_at": null,
                    "sent_at": null,
                    "failed_at": null,
                    "deleted_at": null
                },
            ],
            "meta": {
                "current_page": 1,
                "next_page": null,
                "prev_page": null,
                "total_pages": 1,
                "total_count": 12,
                "per_page": 25
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/payouts')
            .reply(200, body);

        let object = await Payout.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.meta).to.be.instanceof(FedaPayObject);
        expect(object.payouts[0]).to.be.instanceof(Payout);
        expect(object.payouts[0].id).to.equal(16);
        expect(object.payouts[0].klass).to.equal('v1/payout');
        expect(object.payouts[0].reference).to.equal('1540316134325');
        expect(object.payouts[0].amount).to.equal(2000);
        expect(object.payouts[0].status).to.equal('pending');
        expect(object.payouts[0].customer_id).to.equal(2);
        expect(object.payouts[0].currency_id).to.equal(1);
        expect(object.payouts[0].mode).to.equal('mtn');
        expect(object.payouts[0].created_at).to.equal('2018-10-23T17:35:34.325Z');
        expect(object.payouts[0].updated_at).to.equal('2018-10-23T17:35:34.325Z');
        expect(object.payouts[0].scheduled_at).to.equal(null);
        expect(object.payouts[0].sent_at).to.equal(null);
        expect(object.payouts[0].failed_at).to.equal(null);
        expect(object.payouts[0].deleted_at).to.equal(null);
    });

    it('should retrieve a payout', async () => {
        let body = {
            "v1/payout": {
                "klass": "v1/payout",
                "id": 16,
                "reference": "1540316134325",
                "amount": 2000,
                "status": "pending",
                "customer_id": 2,
                "currency_id": 1,
                "mode": "mtn",
                "last_error_code": null,
                "last_error_message": null,
                "created_at": "2018-10-23T17:35:34.325Z",
                "updated_at": "2018-10-23T17:35:34.325Z",
                "scheduled_at": null,
                "sent_at": null,
                "failed_at": null,
                "deleted_at": null
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/payouts/16')
            .reply(200, body);

        let payout = await Payout.retrieve(16);
        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/16',
            method: 'get'
        });

        expect(payout).to.be.instanceof(FedaPayObject);
        expect(payout).to.be.instanceof(Payout);
        expect(payout.id).to.equal(16);
        expect(payout.klass).to.equal('v1/payout');
        expect(payout.reference).to.equal('1540316134325');
        expect(payout.amount).to.equal(2000);
        expect(payout.status).to.equal('pending');
        expect(payout.customer_id).to.equal(2);
        expect(payout.currency_id).to.equal(1);
        expect(payout.mode).to.equal('mtn');
        expect(payout.created_at).to.equal('2018-10-23T17:35:34.325Z');
        expect(payout.updated_at).to.equal('2018-10-23T17:35:34.325Z');
        expect(payout.scheduled_at).to.equal(null);
        expect(payout.sent_at).to.equal(null);
        expect(payout.failed_at).to.equal(null);
        expect(payout.deleted_at).to.equal(null);
    });

    it('should create payout', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'amount': 2000,
            'include': 'customer,currency'
        };

        let body = {
            "v1/payout": {
                "klass": "v1/payout",
                "id": 17,
                "reference": "1540402065678",
                "amount": data.amount,
                "status": "pending",
                "customer_id": data.customer.id,
                "currency_id": 1,
                "mode": "mtn",
                "last_error_code": null,
                "last_error_message": null,
                "created_at": "2018-10-24T17:27:45.677Z",
                "updated_at": "2018-10-24T17:27:45.677Z",
                "scheduled_at": null,
                "sent_at": null,
                "failed_at": null,
                "deleted_at": null,
                "customer": {
                    "klass": "v1/customer",
                    "id": data.customer.id,
                    "firstname": "SOHOU",
                    "lastname": "Zidial",
                    "email": "zinsou@test.com",
                    "account_id": 1,
                    "created_at": "2018-10-17T16:03:24.061Z",
                    "updated_at": "2018-10-17T16:03:24.061Z"
                }
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/payouts')
            .reply(200, body);

        let payout = await Payout.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts',
            data: JSON.stringify(data),
            method: 'post'
        });

        expect(payout).to.be.instanceof(FedaPayObject);
        expect(payout).to.be.instanceof(Payout);
        expect(payout.customer).to.be.instanceof(Customer);
        expect(payout.id).to.equal(17);
        expect(payout.klass).to.equal('v1/payout');
        expect(payout.reference).to.equal('1540402065678');
        expect(payout.amount).to.equal(2000);
        expect(payout.status).to.equal('pending');
        expect(payout.customer_id).to.equal(data.customer.id);
        expect(payout.currency_id).to.equal(1);
        expect(payout.mode).to.equal('mtn');
        expect(payout.created_at).to.equal('2018-10-24T17:27:45.677Z');
        expect(payout.updated_at).to.equal('2018-10-24T17:27:45.677Z');
        expect(payout.scheduled_at).to.equal(null);
        expect(payout.sent_at).to.equal(null);
        expect(payout.failed_at).to.equal(null);
        expect(payout.deleted_at).to.equal(null);
    });

    it('should delete payout', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'amount': 1000,
            'include': 'customer,currency'
        };

        let body = {
            "v1/payout": {
                "klass": "v1/payout",
                "id": 17,
                "reference": "1540402065678",
                "amount": data.amount,
                "status": "pending",
                "customer_id": data.customer.id,
                "currency_id": 1,
                "mode": "mtn",
                "last_error_code": null,
                "last_error_message": null,
                "created_at": "2018-10-24T17:27:45.677Z",
                "updated_at": "2018-10-24T17:27:45.677Z",
                "scheduled_at": null,
                "sent_at": null,
                "failed_at": null,
                "deleted_at": null,
                "customer": {
                    "klass": "v1/customer",
                    "id": data.customer.id,
                    "firstname": "SOHOU",
                    "lastname": "Zidial",
                    "email": "zinsou@test.com",
                    "account_id": 1,
                    "created_at": "2018-10-17T16:03:24.061Z",
                    "updated_at": "2018-10-17T16:03:24.061Z"
                }
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/payouts')
            .reply(200, body);

        let payout = await Payout.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts',
            data: JSON.stringify(data),
            method: 'post'
        });

        nock(/fedapay\.com/)
            .delete('/v1/payouts/17')
            .reply(200);

        await payout.delete();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/17',
            method: 'delete'
        });
    });

    it('should update payout', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'amount': 5000,
            'include': 'customer,currency'
        };

        let body = {
            "v1/payout": {
                "klass": "v1/payout",
                "id": 17,
                "reference": "1540402065678",
                "amount": data.amount,
                "status": "pending",
                "customer_id": data.customer.id,
                "currency_id": 1,
                "mode": "mtn",
                "last_error_code": null,
                "last_error_message": null,
                "created_at": "2018-10-24T17:27:45.677Z",
                "updated_at": "2018-10-24T17:27:45.677Z",
                "scheduled_at": null,
                "sent_at": null,
                "failed_at": null,
                "deleted_at": null,
                "customer": {
                    "klass": "v1/customer",
                    "id": data.customer.id,
                    "firstname": "SOHOU",
                    "lastname": "Zidial",
                    "email": "zinsou@test.com",
                    "account_id": 1,
                    "created_at": "2018-10-17T16:03:24.061Z",
                    "updated_at": "2018-10-17T16:03:24.061Z"
                }
            }
        };

        nock(/fedapay\.com/)
            .put('/v1/payouts/17')
            .reply(200, body);

        let payout = await Payout.update(17, data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/17',
            data: JSON.stringify(data),
            method: 'put'
        });

        expect(payout).to.be.instanceof(FedaPayObject);
        expect(payout).to.be.instanceof(Payout);
        expect(payout.customer).to.be.instanceof(Customer);
        expect(payout.id).to.equal(17);
        expect(payout.klass).to.equal('v1/payout');
        expect(payout.reference).to.equal('1540402065678');
        expect(payout.amount).to.equal(5000);
        expect(payout.status).to.equal('pending');
        expect(payout.customer_id).to.equal(data.customer.id);
        expect(payout.currency_id).to.equal(1);
        expect(payout.mode).to.equal('mtn');
        expect(payout.created_at).to.equal('2018-10-24T17:27:45.677Z');
        expect(payout.updated_at).to.equal('2018-10-24T17:27:45.677Z');
        expect(payout.scheduled_at).to.equal(null);
        expect(payout.sent_at).to.equal(null);
        expect(payout.failed_at).to.equal(null);
        expect(payout.deleted_at).to.equal(null);
    });

    it('should update payout with save', async () => {
        let data = {
            'customer': {
                'id': 1
            },
            'currency': {
                'iso': 'XOF'
            },
            'amount': 5000,
            'include': 'customer,currency'
        };

        let body = {
            "v1/payout": {
                "klass": "v1/payout",
                "id": 17,
                "reference": "1540402065678",
                "amount": data.amount,
                "status": "pending",
                "customer_id": data.customer.id,
                "currency_id": 1,
                "mode": "mtn",
                "last_error_code": null,
                "last_error_message": null,
                "created_at": "2018-10-24T17:27:45.677Z",
                "updated_at": "2018-10-24T17:27:45.677Z",
                "scheduled_at": null,
                "sent_at": null,
                "failed_at": null,
                "deleted_at": null,
                "customer": {
                    "klass": "v1/customer",
                    "id": data.customer.id,
                    "firstname": "SOHOU",
                    "lastname": "Zidial",
                    "email": "zinsou@test.com",
                    "account_id": 1,
                    "created_at": "2018-10-17T16:03:24.061Z",
                    "updated_at": "2018-10-17T16:03:24.061Z"
                }
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/payouts')
            .reply(200, body);

        let payout = await Payout.create(data);
        let updateData = payout.serializeParameters();

        payout.amount = 18500;

        nock(/fedapay\.com/)
            .put('/v1/payouts/17')
            .reply(200, body);

        await payout.save();

        updateData.amount = 18500;

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/17',
            data: JSON.stringify(updateData),
            method: 'put'
        });
    });

    it('should schedule a payout', async () => {
        const payout = await createPayout();
        const body = {
            "v1/payouts": [{
                'klass': 'v1/payout',
                'id': 1,
                'reference': '1540316134325',
                'amount': 1000,
                'status': 'started',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'last_error_code': null,
                'last_error_message': null,
                'created_at': '2018-10-23T17:35:34.325Z',
                'updated_at': '2018-10-23T17:36:40.086Z',
                'scheduled_at': '2018-11-01 18:30:22',
                'sent_at': null,
                'started_at': '2018-11-01 18:30:22',
                'failed_at': null,
                'deleted_at': null
            }]
        };

        nock(/fedapay\.com/)
            .put('/v1/payouts/start')
            .reply(200, body);

        await payout.schedule('2018-11-01 18:30:22');

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/start',
            data: JSON.stringify({
                "payouts": [
                    {
                        "id": 1,
                        "scheduled_at": '2018-11-01 18:30:22'
                    }
                ]
            }),
            method: 'put'
        });

        expect(payout.status).to.equal('started');
        expect(payout.scheduled_at).to.equal('2018-11-01 18:30:22');
        expect(payout.started_at).to.equal('2018-11-01 18:30:22');
    });

    it('should schedule a payout with phone number', async () => {
        const payout = await createPayout();
        const body = {
            "v1/payouts": [{
                'klass': 'v1/payout',
                'id': 1,
                'reference': '1540316134325',
                'amount': 1000,
                'status': 'started',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'last_error_code': null,
                'last_error_message': null,
                'created_at': '2018-10-23T17:35:34.325Z',
                'updated_at': '2018-10-23T17:36:40.086Z',
                'scheduled_at': '2018-11-01 18:30:22',
                'sent_at': null,
                'started_at': '2018-11-01 18:30:22',
                'failed_at': null,
                'deleted_at': null
            }]
        };

        nock(/fedapay\.com/)
            .put('/v1/payouts/start')
            .reply(200, body);

        await payout.schedule(
          '2018-11-01 18:30:22',
          { phone_number: { number: '66000001', country: 'BJ' } }
        );

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/start',
            data: JSON.stringify({
                "payouts": [
                    {
                        "id": 1,
                        "scheduled_at": '2018-11-01 18:30:22',
                        "phone_number": {
                          "number": '66000001', "country": 'BJ'
                        }
                    }
                ]
            }),
            method: 'put'
        });

        expect(payout.status).to.equal('started');
        expect(payout.scheduled_at).to.equal('2018-11-01 18:30:22');
        expect(payout.started_at).to.equal('2018-11-01 18:30:22');
    });

    it('should fail schedule all payouts', async () => {
        const data = [{ scheduled_at: '2018-11-01 18:30:22' }];

        try {
            await Payout.scheduleAll(data);
        } catch (e) {
            expect(e).to.be.an.instanceof(Error);
            expect(e.message).to.equal('Invalid id argument. You must specify payout id.');
        }
    });

    it('should schedule all payouts', async () => {
        const payout = await createPayout();
        const body = {
            "v1/payouts": [{
                'klass': 'v1/payout',
                'id': 1,
                'reference': '1540316134325',
                'amount': 1000,
                'status': 'started',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'last_error_code': null,
                'last_error_message': null,
                'created_at': '2018-10-23T17:35:34.325Z',
                'updated_at': '2018-10-23T17:36:40.086Z',
                'scheduled_at': '2018-11-01 18:30:22',
                'sent_at': null,
                'started_at': '2018-11-01 18:30:22',
                'failed_at': null,
                'deleted_at': null
            }]
        };

        nock(/fedapay\.com/)
            .put('/v1/payouts/start')
            .reply(200, body);

        const object = await Payout.scheduleAll([{
            id: payout.id,
            scheduled_at: '2018-11-01 18:30:22'
        }]);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/start',
            data: JSON.stringify({
                "payouts": [
                    {
                        "id": 1,
                        "scheduled_at": '2018-11-01 18:30:22'
                    }
                ]
            }),
            method: 'put'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.payouts[0]).to.be.instanceof(Payout);
        expect(object.payouts[0].id).to.equal(1);
        expect(object.payouts[0].status).to.equal('started');
        expect(object.payouts[0].scheduled_at).to.equal('2018-11-01 18:30:22');
        expect(object.payouts[0].started_at).to.equal('2018-11-01 18:30:22');
    });

    it('should send a payout now', async () => {
        const payout = await createPayout();
        const body = {
            "v1/payouts": [{
                'klass': 'v1/payout',
                'id': 1,
                'reference': '1540316134325',
                'amount': 1000,
                'status': 'sent',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'last_error_code': null,
                'last_error_message': null,
                'created_at': '2018-10-23T17:35:34.325Z',
                'updated_at': '2018-10-23T17:36:40.086Z',
                'scheduled_at': '2018-11-01 18:30:22',
                'sent_at': '2018-11-01 18:30:22',
                'started_at': '2018-11-01 18:30:22',
                'failed_at': null,
                'deleted_at': null
            }]
        };

        nock(/fedapay\.com/)
            .put('/v1/payouts/start')
            .reply(200, body);

        await payout.sendNow();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/start',
            data: JSON.stringify({
                "payouts": [
                    {
                        "id": 1
                    }
                ]
            }),
            method: 'put'
        });

        expect(payout.status).to.equal('sent');
        expect(payout.sent_at).to.equal('2018-11-01 18:30:22');
    });

    it('should send a payout now with phone number', async () => {
        const payout = await createPayout();
        const body = {
            "v1/payouts": [{
                'klass': 'v1/payout',
                'id': 1,
                'reference': '1540316134325',
                'amount': 1000,
                'status': 'sent',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'last_error_code': null,
                'last_error_message': null,
                'created_at': '2018-10-23T17:35:34.325Z',
                'updated_at': '2018-10-23T17:36:40.086Z',
                'scheduled_at': '2018-11-01 18:30:22',
                'sent_at': '2018-11-01 18:30:22',
                'started_at': '2018-11-01 18:30:22',
                'failed_at': null,
                'deleted_at': null
            }]
        };

        nock(/fedapay\.com/)
            .put('/v1/payouts/start')
            .reply(200, body);

        await payout.sendNow({
          phone_number: { number: '66000001', country: 'BJ' }
        });

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/start',
            data: JSON.stringify({
                "payouts": [
                    {
                        "id": 1,
                        "phone_number": { "number": '66000001', "country": 'BJ' }
                    }
                ]
            }),
            method: 'put'
        });

        expect(payout.status).to.equal('sent');
        expect(payout.sent_at).to.equal('2018-11-01 18:30:22');
    });

    it('should send all payouts now', async () => {
        const payout = await createPayout();
        const body = {
            "v1/payouts": [{
                'klass': 'v1/payout',
                'id': 1,
                'reference': '1540316134325',
                'amount': 1000,
                'status': 'sent',
                'customer_id': 1,
                'currency_id': 1,
                'mode': 'mtn',
                'last_error_code': null,
                'last_error_message': null,
                'created_at': '2018-10-23T17:35:34.325Z',
                'updated_at': '2018-10-23T17:36:40.086Z',
                'scheduled_at': '2018-11-01 18:30:22',
                'sent_at': '2018-11-01 18:30:22',
                'started_at': '2018-11-01 18:30:22',
                'failed_at': null,
                'deleted_at': null
            }]
        };

        nock(/fedapay\.com/)
            .put('/v1/payouts/start')
            .reply(200, body);

        const object = await Payout.sendAllNow([payout]);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/payouts/start',
            data: JSON.stringify({
                "payouts": [
                    {
                        "id": 1
                    }
                ]
            }),
            method: 'put'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.payouts[0]).to.be.instanceof(Payout);
        expect(object.payouts[0].id).to.equal(1);
        expect(object.payouts[0].status).to.equal('sent');
        expect(object.payouts[0].sent_at).to.equal('2018-11-01 18:30:22');
    });

    it('should send all payouts now with phone number', async () => {
      const payout = await createPayout();
      const body = {
          "v1/payouts": [{
              'klass': 'v1/payout',
              'id': 1,
              'reference': '1540316134325',
              'amount': 1000,
              'status': 'sent',
              'customer_id': 1,
              'currency_id': 1,
              'mode': 'mtn',
              'last_error_code': null,
              'last_error_message': null,
              'created_at': '2018-10-23T17:35:34.325Z',
              'updated_at': '2018-10-23T17:36:40.086Z',
              'scheduled_at': '2018-11-01 18:30:22',
              'sent_at': '2018-11-01 18:30:22',
              'started_at': '2018-11-01 18:30:22',
              'failed_at': null,
              'deleted_at': null
          }]
      };

      nock(/fedapay\.com/)
          .put('/v1/payouts/start')
          .reply(200, body);

      const object = await Payout.sendAllNow([payout], [
        { phone_number: { number: '66000001', country: 'BJ' } }
      ]);

      exceptRequest({
          url: 'https://sandbox-api.fedapay.com/v1/payouts/start',
          data: JSON.stringify({
              "0": {},
              "payouts": [
                  {
                      "id": 1,
                      "phone_number": { "number": '66000001', "country": 'BJ' }
                  }
              ]
          }),
          method: 'put'
      });

      expect(object).to.be.instanceof(FedaPayObject);
      expect(object.payouts[0]).to.be.instanceof(Payout);
      expect(object.payouts[0].id).to.equal(1);
      expect(object.payouts[0].status).to.equal('sent');
      expect(object.payouts[0].sent_at).to.equal('2018-11-01 18:30:22');
  });
});
