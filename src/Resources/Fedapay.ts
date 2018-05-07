let path = require('path');

export class Fedapay {
    readonly VERSION = '0.1.1';
    apiKey = '';
    token = '';
    accountId = '';
    environment = 'sandbox';
    apiVersion = 'v1';
    verifySslCerts = true;
    caBundlePath: string = '';

    setApiKey(apiKey: any) {
        this.apiKey = apiKey;
        this.token = '';
    }

    getApiKey() {
        return this.apiKey;
    }

    setToken(token: any) {
        this.token = token;
    }

    getCaBundlePath() {
        if(!this.caBundlePath) {
            this.caBundlePath = path.join(__dirname, './../data/ca-certificates.crt');
        }
        return this.caBundlePath;
    }
}