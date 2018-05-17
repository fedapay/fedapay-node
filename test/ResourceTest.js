let expect = require('chai').expect;
let lib = require('../dist/index.js');

describe('ResourceTest', () => {
    it('should return Class name', () => {
        class Foo extends lib.Resource {}
        expect(Foo.className()).to.equal('foo');

        class FooTest extends lib.Resource {}
        expect(FooTest.className()).to.equal('footest');
    });

    it('should return Class url', () => {
        class Foo extends lib.Resource {}
        expect(Foo.classPath()).to.equal('/foos');
        class FooTest extends lib.Resource {}
        expect(FooTest.classPath()).to.equal('/footests');
        class FooPerson extends lib.Resource {}
        expect(FooPerson.classPath()).to.equal('/foopeople');
        class FooCurrency extends lib.Resource {}
        expect(FooCurrency.classPath()).to.equal('/foocurrencies');
    });

    it('should return resource url', () => {
        class Foo extends lib.Resource {}
        expect(Foo.resourcePath(1)).to.equal('/foos/1');
    });
});