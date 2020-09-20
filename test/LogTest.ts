import 'mocha';
import { Log, FedaPayObject } from '../src';
import { exceptRequest, setUp, tearDown } from './utils';
import { expect } from 'chai';
import * as nock from 'nock';

describe('LogTests', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should return logs', async () => {
        let body = {
            'v1/logs': [{
                'id': 1,
                'klass': 'v1/log',
                'method': 'GET',
                'url': '/url',
                'status': 200,
                'ip_address': '189.2.33.9',
                'version': '0.1.1',
                'source': 'FedaPay PhpLib',
                'query': '{"q":"search"}',
                'body': '{}',
                'response': '{}',
                'account_id': 1,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }],
            'meta': {'page': 1}
        };

        nock(/fedapay\.com/)
            .get('/v1/logs')
            .reply(200, body);

        let object = await Log.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/logs',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.logs[0]).to.be.instanceof(Log);
        expect(object.logs[0].id).to.equal(1);
        expect(object.logs[0].klass).to.equal('v1/log');
        expect(object.logs[0].method).to.equal('GET');
        expect(object.logs[0].url).to.equal('/url');
        expect(object.logs[0].status).to.equal(200);
        expect(object.logs[0].ip_address).to.equal('189.2.33.9');
        expect(object.logs[0].version).to.equal('0.1.1');
        expect(object.logs[0].source).to.equal('FedaPay PhpLib');
        expect(object.logs[0].query).to.equal('{"q":"search"}');
        expect(object.logs[0].body).to.equal('{}');
        expect(object.logs[0].response).to.equal('{}');
        expect(object.logs[0].account_id).to.equal(1);
        expect(object.logs[0].created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.logs[0].updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should retrieve a log', async () => {
        let body = {
            'v1/log': {
                'id': 1,
                'klass': 'v1/log',
                'method': 'GET',
                'url': '/url',
                'status': 200,
                'ip_address': '189.2.33.9',
                'version': '0.1.1',
                'source': 'FedaPay PhpLib',
                'query': '{"q":"search"}',
                'body': '{}',
                'response': '{}',
                'account_id': 1,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/logs/1')
            .reply(200, body);

        let object = await Log.retrieve(1);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/logs/1',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object).to.be.instanceof(Log);

        expect(object.id).to.equal(1);
        expect(object.klass).to.equal('v1/log');
        expect(object.method).to.equal('GET');
        expect(object.url).to.equal('/url');
        expect(object.status).to.equal(200);
        expect(object.ip_address).to.equal('189.2.33.9');
        expect(object.version).to.equal('0.1.1');
        expect(object.source).to.equal('FedaPay PhpLib');
        expect(object.query).to.equal('{"q":"search"}');
        expect(object.body).to.equal('{}');
        expect(object.response).to.equal('{}');
        expect(object.account_id).to.equal(1);
        expect(object.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should send seubscribe request', async () => {
        let body = {
            'foo': 'bar'
        };

        nock(/fedapay\.com/)
            .post('/v1/logs/subscribe')
            .reply(200, body);

        let object = await Log.subscribe();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/logs/subscribe',
            method: 'post'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.foo).to.equal('bar');
    });
});
