const VERSION = '0.1.1';

class Fedapay {

    constructor(attrs) {
        this.build(attrs);
    }

    build(attrs) {}

    static get VERSION() {
        return VERSION;
    }

    get apiKey() { return this._apiKey; }
    get token() { return this._token; }

}

module.exports = new Fedapay();