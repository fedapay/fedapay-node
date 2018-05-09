let path = require('path');

export class FedaPay {
    readonly VERSION = '0.1.1';
    public static apiKey = '';
    public static token = '';
    public static accountId = '';
    protected static environment = 'sandbox';
    protected static apiVersion = 'v1';
    protected static verifySslCerts = true;
    protected static caBundlePath: string = '';

    static setApiKey(apiKey: any) {
        FedaPay.apiKey = apiKey;
        FedaPay.token = '';
    }

    static setToken(token: any) {
        FedaPay.token = token;
    }
    
    static setEnvironment(value: any) {
        FedaPay.environment = value;
    }

    static getEnvironment() {
        return FedaPay.environment;
    }

    static getApiVersion() {
        return FedaPay.apiVersion;
    }
    
    static setVerifySslCerts(value: any) {
        FedaPay.verifySslCerts = value;
    }

    static getVerifySslCerts() {
        return FedaPay.verifySslCerts;
    }

    static setCaBundlePath(value: any) {
        FedaPay.caBundlePath = value;
    }

    static getCaBundlePath() {
        if(!FedaPay.caBundlePath) {
            FedaPay.caBundlePath = path.join(__dirname, './../data/ca-certificates.crt');
        }
        return FedaPay.caBundlePath;
    }
}