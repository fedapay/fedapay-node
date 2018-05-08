let expect = require('chai').expect;
let lib = require('../dist/index.js');

describe('FedapayObjectTest', () => {
    it('should set object attribute', () => {
        let instance = new lib.FedapayObject();
        instance.id = 1;
        instance.name = 'name';

        expect(instance.id).to.equal(1);
        expect(instance['id']).to.equal(1);
        expect(instance.name).to.equal('name');
        expect(instance['name']).to.equal('name');

        instance = new lib.FedapayObject(2);
        expect(instance.id).to.equal(2);

        instance = new lib.FedapayObject({ 'foo': 'value' });
        expect(instance.foo).to.equal('value');
        /* expect(instance.foo).to.be.true;
        expect(instance['foo']).to.be.true;
        expect(instance['doe']).to.be.false;
        expect(instance.doe).to.be.false; */
    });
});