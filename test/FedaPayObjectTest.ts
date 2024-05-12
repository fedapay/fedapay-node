import 'mocha';
import { expect } from 'chai';
import { FedaPayObject } from '../src';

describe('FedaPayObjectTest', () => {
    it('should set object attribute', () => {
        let object = new FedaPayObject();
        object.id = 1;
        object.name = 'name';

        expect(object.id).to.equal(1);
        expect(object['id']).to.equal(1);
        expect(object.name).to.equal('name');
        expect(object['name']).to.equal('name');

        object = new FedaPayObject(2);
        expect(object.id).to.equal(2);

        object = new FedaPayObject({ foo: 'value' });
        expect(object.foo).to.equal('value');
        expect(object['foo']).to.equal('value');
        expect(object['doe']).to.be.undefined;
        expect(object.doe).to.be.undefined;
    });

    it('should serialize object', () => {
        let object = new FedaPayObject({ 'foo': 'value' });
        let json = JSON.stringify(object);

        expect(json).to.equal('{"foo":"value"}');
    });

    it('should refresh object', () => {
        let object = new FedaPayObject();
        object.refreshFrom({'foo': 'value'}, null);

        expect(object.foo).to.equal('value');
    });

    it('should serialize object params', () => {
        let object = new FedaPayObject();
        object.refreshFrom({ 'foo': 'value', 'id': 2 }, null);

        let params = object.serializeParameters();

        expect(params.foo).to.equals('value');
        expect(params.id).to.be.undefined;
    });

    it('should return resource name', () => {
        let object = new FedaPayObject();
        object.refreshFrom({ 'foo': 'value', 'id': 2 }, null);

        let params = object.serializeParameters();

        expect(params.foo).to.equals('value');
        expect(params.id).to.be.undefined;
    });
});
