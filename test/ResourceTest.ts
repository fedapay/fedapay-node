import { expect } from 'chai';
import * as nock from 'nock';
import { Resource, InvalidRequest } from '../src';
import { Foo, FooTest, FooPerson, FooCurrency } from './fixtures';

describe('ResourceTest', () => {

    it('should return class name', () => {
        expect(Foo.className()).to.equal('foo');
        expect(FooTest.className()).to.equal('footest');
    });

    it('should return Class url', () => {
        expect(Foo.classPath()).to.equal('/foos');
        expect(FooTest.classPath()).to.equal('/footests');
        expect(FooPerson.classPath()).to.equal('/foopeople');
        expect(FooCurrency.classPath()).to.equal('/foocurrencies');
    });

    it('should throw invalid request exception', () => {
        try {
            Foo.resourcePath(null);
            throw new Error; // Don't reach this code
        } catch(e) {
            expect(e).to.be.an.instanceof(InvalidRequest);
            expect(e.message).to.equal('Could not determine which URL to '+
            'request: foo instance has invalid ID: null')
        }
    });

    it('should return resource url', () => {
        expect(Foo.resourcePath(1)).to.equal('/foos/1');
    });

    it('should return instance url', () => {
        let object = new Foo
        object.id = 1;
        expect(object.instanceUrl()).to.equal('/foos/1');
    });
});
