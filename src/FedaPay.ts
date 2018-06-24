import * as path from 'path';

export class FedaPay {
    static readonly VERSION = '1.1.0';
    protected static apiKey: string;
    protected static apiBase: string;
    protected static token = '';
    protected static accountId: string|number = '';
    protected static environment = 'sandbox';
    protected static apiVersion = 'v1';
    protected static verifySslCerts = true;
    protected static caBundlePath: string = '';

    /**
     * Return the api key
     * @return string
     */
    static getApiKey()
    {
        return FedaPay.apiKey;
    }

    /**
     * Set api key
     * @param apiKey string
     */
    static setApiKey(apiKey: string) {
        FedaPay.apiKey = apiKey;
        FedaPay.token = '';
    }

    /**
     * Return the api key
     * @return string
     */
    static getApiBase()
    {
        return FedaPay.apiBase;
    }

    /**
     * Set api key
     * @param apiBase string
     */
    static setApiBase(apiBase: string) {
        FedaPay.apiBase = apiBase;
    }

    /**
     * Return the token
     * @returns string
     */
    static getToken()
    {
        return FedaPay.token;
    }

    /**
     * Set token
     * @param token
     */
    static setToken(token: string) {
        FedaPay.token = token;
    }

    /**
     * Return the token
     * @returns string
     */
    static getAccountId()
    {
        return FedaPay.accountId;
    }

    /**
     * Set the account id
     * @param accountId string|number
     */
    static setAccountId(accountId: string | number) {
        FedaPay.accountId = accountId;
    }

    /**
     * Set the environment
     * @param value string
     */
    static setEnvironment(value: string) {
        FedaPay.environment = value;
    }

    /**
     * Get the environment
     * @return string
     */
    static getEnvironment() {
        return FedaPay.environment;
    }

    /**
     * Retutn the api version
     * @return string
     */
    static getApiVersion() : string {
        return FedaPay.apiVersion;
    }

    /**
     * Set api version
     * @param version string
     */
    static setApiVersion(version: string) {
        FedaPay.apiVersion = version;
    }

    /**
     * @param value boolean The verify ssl certificates value.
     * @return void
     */
    static setVerifySslCerts(value: boolean) {
        FedaPay.verifySslCerts = value;
    }

    /**
     * @return boolean Determine if the request should verify SSL certificate.
     */
    static getVerifySslCerts() : boolean {
        return FedaPay.verifySslCerts;
    }

    /**
     * Set the ca bundle path
     * @param value string
     */
    static setCaBundlePath(value: string) {
        FedaPay.caBundlePath = value;
    }

    /**
     * Get the ca bundle path
     * @return string
     */
    static getCaBundlePath(): string {
        if(!FedaPay.caBundlePath) {
            FedaPay.caBundlePath = path.join(__dirname, '/../data/ca-certificates.crt');
        }

        return FedaPay.caBundlePath;
    }
}
