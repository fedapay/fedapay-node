export declare class FedaPay {
    static readonly VERSION: string;
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
     * @return string
     */
    static getApiKey(): string;
    /**
     * Set api key
     * @param apiKey string
     */
    static setApiKey(apiKey: string): void;
    /**
     * Return the api key
     * @return string
     */
    static getApiBase(): string;
    /**
     * Set api key
     * @param apiBase string
     */
    static setApiBase(apiBase: string): void;
    /**
     * Return the token
     * @returns string
     */
    static getToken(): string;
    /**
     * Set token
     * @param token
     */
    static setToken(token: string): void;
    /**
     * Return the token
     * @returns string
     */
    static getAccountId(): string | number;
    /**
     * Set the account id
     * @param accountId string|number
     */
    static setAccountId(accountId: string | number): void;
    /**
     * Set the environment
     * @param value string
     */
    static setEnvironment(value: string): void;
    /**
     * Get the environment
     * @return string
     */
    static getEnvironment(): string;
    /**
     * Retutn the api version
     * @return string
     */
    static getApiVersion(): string;
    /**
     * Set api version
     * @param version string
     */
    static setApiVersion(version: string): void;
    /**
     * @param value boolean The verify ssl certificates value.
     * @return void
     */
    static setVerifySslCerts(value: boolean): void;
    /**
     * @return boolean Determine if the request should verify SSL certificate.
     */
    static getVerifySslCerts(): boolean;
    /**
     * Set the ca bundle path
     * @param value string
     */
    static setCaBundlePath(value: string): void;
    /**
     * Get the ca bundle path
     * @return string
     */
    static getCaBundlePath(): string;
}
