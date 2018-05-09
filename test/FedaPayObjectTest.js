let expect = require('chai').expect;
let lib = require('../dist/index.js');

describe('FedaPayObjectTest', () => {
    it('should set object attribute', () => {
        let instance = new lib.FedaPayObject();
        instance.id = 1;
        instance.name = 'name';

        expect(instance.id).to.equal(1);
        expect(instance['id']).to.equal(1);
        expect(instance.name).to.equal('name');
        expect(instance['name']).to.equal('name');

        instance = new lib.FedaPayObject(2);
        expect(instance.id).to.equal(2);

        instance = new lib.FedaPayObject({ 'foo': 'value' });
        expect(instance.foo).to.equal('value');
        expect(typeof instance.foo !== 'undefined').to.be.true;
        expect(typeof instance['foo'] !== 'undefined').to.be.true;
        expect(typeof instance['doe'] !== 'undefined').to.be.false;
        expect(typeof instance.doe !== 'undefined').to.be.false;
    });

    it('testShouldSerializeObject', () => {
        let instance = new lib.FedaPayObject({ 'foo': 'value' });
        let json = JSON.stringify(instance);

        expect(json).to.equal('{"values":[],"foo":"value"}');
    });

    it('testShouldRefreshObject', () => {
        let instance = new lib.FedaPayObject();
        instance.refreshFrom({ 'foo': 'value' }, null);

        expect(instance.foo).to.equal('value');
    });

    it('testShouldSerializeObjectParams', () => {
        let instance = new lib.FedaPayObject();
        instance.refreshFrom({ 'foo': 'value', 'id': 2 }, null);
    })

});