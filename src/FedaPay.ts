import * as path from 'path';

/**
 * Class FedaPay
 */
export class FedaPay {
    static readonly VERSION = '1.1.1';
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
     * @return {string}
     */
    static getApiKey()
    {
        return FedaPay.apiKey;
    }

    /**
     * Set api key
     * @param {string} apiKey
     */
    static setApiKey(apiKey: string) {
        FedaPay.apiKey = apiKey;
        FedaPay.token = '';
    }

    /**
     * Return the api key
     * @return {string}
     */
    static getApiBase()
    {
        return FedaPay.apiBase;
    }

    /**
     * Set api key
     * @param {string} apiBase
     */
    static setApiBase(apiBase: string) {
        FedaPay.apiBase = apiBase;
    }

    /**
     * Return the token
     * @returns {string}
     */
    static getToken()
    {
        return FedaPay.token;
    }

    /**
     * Set token
     * @param {string} token
     */
    static setToken(token: string) {
        FedaPay.token = token;
    }

    /**
     * Return the token
     * @returns {string}
     */
    static getAccountId()
    {
        return FedaPay.accountId;
    }

    /**
     * Set the account id
     * @param {string|number} accountId
     */
    static setAccountId(accountId: string | number) {
        FedaPay.accountId = accountId;
    }

    /**
     * Set the environment
     * @param {string} value
     */
    static setEnvironment(value: string) {
        FedaPay.environment = value;
    }

    /**
     * Get the environment
     * @return {string}
     */
    static getEnvironment() {
        return FedaPay.environment;
    }

    /**
     * Retutn the api version
     * @return {string}
     */
    static getApiVersion() : string {
        return FedaPay.apiVersion;
    }

    /**
     * Set api version
     * @param {string} version
     */
    static setApiVersion(version: string) {
        FedaPay.apiVersion = version;
    }

    /**
     * @param {boolean} value The verify ssl certificates value.
     * @return {void}
     */
    static setVerifySslCerts(value: boolean) {
        FedaPay.verifySslCerts = value;
    }

    /**
     * @return {boolean} Determine if the request should verify SSL certificate.
     */
    static getVerifySslCerts() : boolean {
        return FedaPay.verifySslCerts;
    }

    /**
     * Set the ca bundle path
     * @param {string} value
     */
    static setCaBundlePath(value: string) {
        FedaPay.caBundlePath = value;
    }

    /**
     * Get the ca bundle path
     * @return {string}
     */
    static getCaBundlePath(): string {
        if(!FedaPay.caBundlePath) {
            FedaPay.caBundlePath = path.join(__dirname, '/../data/ca-certificates.crt');
        }

        return FedaPay.caBundlePath;
    }
}
