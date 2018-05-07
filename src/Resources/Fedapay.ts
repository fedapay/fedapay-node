let path = require('path');

export class Fedapay {
    readonly VERSION = '0.1.1';
    public static apiKey = '';
    public static token = '';
    public static accountId = '';
    protected static environment = 'sandbox';
    protected static apiVersion = 'v1';
    protected static verifySslCerts = true;
    protected static caBundlePath: string = '';

    setApiKey(apiKey: any) {
        Fedapay.apiKey = apiKey;
        Fedapay.token = '';
    }

    setToken(token: any) {
        Fedapay.token = token;
    }

    static getEnvironment() {
        return Fedapay.environment;
    }

    static getApiVersion() {
        return Fedapay.apiVersion;
    }

    static getVerifySslCerts() {
        return Fedapay.verifySslCerts;
    }

    getCaBundlePath() {
        if(!Fedapay.caBundlePath) {
            Fedapay.caBundlePath = path.join(__dirname, './../data/ca-certificates.crt');
        }
        return Fedapay.caBundlePath;
    }
}