/**
 * Class FedaPay
 */
export declare class FedaPay {
    static readonly VERSION = "1.1.1";
    protected static apiKey: string;
    protected static apiBase: string;
    protected static token: string;
    protected static accountId: string | number;
    protected static environment: string;
    protected static apiVersion: string;
    protected static verifySslCerts: boolean;
    protected static caBundlePath: string;
    /**
     * Return the api key
     * @return {string}
     */
    static getApiKey(): string;
    /**
     * Set api key
     * @param {string} apiKey
     */
    static setApiKey(apiKey: string): void;
    /**
     * Return the api key
     * @return {string}
     */
    static getApiBase(): string;
    /**
     * Set api key
     * @param {string} apiBase
     */
    static setApiBase(apiBase: string): void;
    /**
     * Return the token
     * @returns {string}
     */
    static getToken(): string;
    /**
     * Set token
     * @param {string} token
     */
    static setToken(token: string): void;
    /**
     * Return the token
     * @returns {string}
     */
    static getAccountId(): string | number;
    /**
     * Set the account id
     * @param {string|number} accountId
     */
    static setAccountId(accountId: string | number): void;
    /**
     * Set the environment
     * @param {string} value
     */
    static setEnvironment(value: string): void;
    /**
     * Get the environment
     * @return {string}
     */
    static getEnvironment(): string;
    /**
     * Retutn the api version
     * @return {string}
     */
    static getApiVersion(): string;
    /**
     * Set api version
     * @param {string} version
     */
    static setApiVersion(version: string): void;
    /**
     * @param {boolean} value The verify ssl certificates value.
     * @return {void}
     */
    static setVerifySslCerts(value: boolean): void;
    /**
     * @return {boolean} Determine if the request should verify SSL certificate.
     */
    static getVerifySslCerts(): boolean;
    /**
     * Set the ca bundle path
     * @param {string} value
     */
    static setCaBundlePath(value: string): void;
    /**
     * Get the ca bundle path
     * @return {string}
     */
    static getCaBundlePath(): string;
}
