import 'mocha';
import { expect } from 'chai';
import { InvalidRequest } from '../src';
import { Foo, FooCurrency, FooPerson, FooTest } from './fixtures';

describe('ResourceTest', () => {
    it('should return class name', () => {
        expect(Foo.className()).to.equal('foo');
        expect(FooTest.className()).to.equal('foo_test');
    });

    it('should return Class url', () => {
        expect(Foo.classPath()).to.equal('/foos');
        expect(FooTest.classPath()).to.equal('/foo_tests');
        expect(FooPerson.classPath()).to.equal('/foo_people');
        expect(FooCurrency.classPath()).to.equal('/foo_currencies');
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
