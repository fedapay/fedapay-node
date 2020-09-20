import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import { setUp, tearDown, exceptRequest } from './utils';
import { Event, FedaPayObject } from '../src';

describe('EventTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should retrieve an event', async () => {
        let body = {
            'v1/event': {
                'id': 1,
                'klass': 'v1/event',
                'type': 'transaction.update',
                'entity': [],
                'object_id': 1,
                'account_id': 1,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/events/1')
            .reply(200, body);

        let object = await Event.retrieve(1);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/events/1',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object).to.be.instanceof(Event);
        expect(object.id).to.equal(1);
        expect(object.klass).to.equal('v1/event');
        expect(object.type).to.equal('transaction.update');
        expect(JSON.stringify(object.entity)).to.equal(JSON.stringify([]));
        expect(object.object_id).to.equal(1);
        expect(object.account_id).to.equal(1);
        expect(object.created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should return events', async () => {
        let body = {
            'v1/events': [{
                'id': 1,
                'klass': 'v1/event',
                'type': 'transaction.update',
                'entity': [],
                'object_id': 1,
                'account_id': 1,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }],
            'meta': {'page': 1}
        };

        nock(/fedapay\.com/)
            .get('/v1/events')
            .reply(200, body);

        let object = await Event.all();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/events',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.events[0]).to.be.instanceof(Event);
        expect(object.events[0].id).to.equal(1);
        expect(object.events[0].klass).to.equal('v1/event');
        expect(object.events[0].type).to.equal('transaction.update');
        expect(JSON.stringify(object.events[0].entity)).to.equal(JSON.stringify([]));
        expect(object.events[0].object_id).to.equal(1);
        expect(object.events[0].account_id).to.equal(1);
        expect(object.events[0].created_at).to.equal('2018-03-12T09:09:03.969Z');
        expect(object.events[0].updated_at).to.equal('2018-03-12T09:09:03.969Z');
    });

    it('should send seubscribe request', async () => {
        let body = {
            'foo': 'bar'
        };

        nock(/fedapay\.com/)
            .post('/v1/events/subscribe')
            .reply(200, body);

        let object = await Event.subscribe();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/events/subscribe',
            method: 'post'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.foo).to.equal('bar');
    });
});
