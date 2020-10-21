import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import { Webhook, FedaPayObject } from '../src';
import { exceptRequest, setUp, tearDown } from './utils';

describe('WebhookTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should return webhook', async () => {
        let body = {
            'v1/webhooks': [{
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
            }],
            'meta': { 'page': 1 }
        };

        nock(/fedapay\.com/)
            .get('/v1/webhooks')
            .reply(200, body);

        let object = await Webhook.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.meta).to.be.instanceof(FedaPayObject);
        expect(object.webhooks[0]).to.be.instanceof(Webhook);
        expect(object.webhooks[0].id).to.equal(1);
        expect(object.webhooks[0].klass).to.equal('v1/webhook');
        expect(object.webhooks[0].url).to.equal('http://e-shop.com');
        expect(object.webhooks[0].created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.webhooks[0].updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should retrieve a webhook', async () => {
        let body = {
            'v1/webhook': {
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/webhooks/1')
            .reply(200, body);

        let webhook = await Webhook.retrieve(1);
        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks/1',
            method: 'get'
        });

        expect(webhook).to.be.instanceof(FedaPayObject);
        expect(webhook).to.be.instanceof(Webhook);
        expect(webhook.id).to.equal(1);
        expect(webhook.klass).to.equal('v1/webhook');
        expect(webhook.url).to.equal('http://e-shop.com');
        expect(webhook.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(webhook.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should create webhook', async () => {
        let data = {
            'url': 'http://e-shop.com'
        };

        let body = {
            'v1/webhook': {
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/webhooks')
            .reply(200, body);

        let webhook = await Webhook.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks',
            data: JSON.stringify(data),
            method: 'post'
        });

        expect(webhook).to.be.instanceof(FedaPayObject);
        expect(webhook).to.be.instanceof(Webhook);
        expect(webhook.id).to.equal(1);
        expect(webhook.klass).to.equal('v1/webhook');
        expect(webhook.url).to.equal('http://e-shop.com');
        expect(webhook.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(webhook.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should delete webhook', async () => {
        let data = {
            'url': 'http://e-shop.com'
        };

        let body = {
            'v1/webhook': {
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/webhooks')
            .reply(200, body);

        let webhook = await Webhook.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks',
            data: JSON.stringify(data),
            method: 'post'
        });

        nock(/fedapay\.com/)
            .delete('/v1/webhooks/1')
            .reply(200);

        await webhook.delete();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks/1',
            method: 'delete'
        });
    });

    it('should update webhook', async () => {
        let data = {
            'url': 'http://e-shop.com'
        };

        let body = {
            'v1/webhook': {
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z',
            }
        };

        nock(/fedapay\.com/)
            .put('/v1/webhooks/1')
            .reply(200, body);

        let webhook = await Webhook.update(1, data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks/1',
            data: JSON.stringify(data),
            method: 'put'
        });

        expect(webhook).to.be.instanceof(FedaPayObject);
        expect(webhook).to.be.instanceof(Webhook);
        expect(webhook.id).to.equal(1);
        expect(webhook.klass).to.equal('v1/webhook');
        expect(webhook.url).to.equal('http://e-shop.com');
        expect(webhook.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(webhook.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should update webhook with save', async () => {
        let data = {
            'url': 'http://e-shop.com'
        };

        let body = {
            'v1/webhook': {
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/webhooks')
            .reply(200, body);

        let webhook = await Webhook.create(data);
        let updateData = webhook.serializeParameters();

        webhook.amount = 18500;

        nock(/fedapay\.com/)
            .put('/v1/webhooks/1')
            .reply(200, body);

        await webhook.save();

        updateData.amount = 18500;

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks/1',
            data: JSON.stringify(updateData),
            method: 'put'
        });
    });

    it('should a stub event', async () => {
        let data = {
            'url': 'http://e-shop.com'
        };

        let body: any = {
            'v1/webhook': {
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/webhooks')
            .reply(200, body);

        let webhook = await Webhook.create(data);

        body = {
            'name': 'transaction.create',
            'entity': {}
        };
        nock(/fedapay\.com/)
            .post('/v1/webhooks/stub_event')
            .reply(200, body);

        const tokenObject = await Webhook.stubEvent({ event: 'transaction.create' });

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks/stub_event',
            method: 'post'
        });

        expect(tokenObject).to.be.instanceof(FedaPayObject);
        expect(tokenObject.name).to.equal('transaction.create');
    });

    it('should a send stub event', async () => {
        let data = {
            'url': 'http://e-shop.com'
        };

        let body: any = {
            'v1/webhook': {
                'id': 1,
                'klass': 'v1/webhook',
                'url': 'http://e-shop.com',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/webhooks')
            .reply(200, body);

        let webhook = await Webhook.create(data);

        body = {
            'name': 'transaction.create',
            'entity': {}
        };
        nock(/fedapay\.com/)
            .post('/v1/webhooks/1/send_event')
            .reply(200, body);

        const tokenObject = await webhook.sendEvent({ event: 'transaction.create' });

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/webhooks/1/send_event',
            method: 'post'
        });

        expect(tokenObject).to.be.instanceof(FedaPayObject);
        expect(tokenObject.name).to.equal('transaction.create');
    });
});
