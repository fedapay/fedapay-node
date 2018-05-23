export declare class FedaPay {
    readonly VERSION: string;
    static apiKey: string;
    static token: string;
    static accountId: string;
    protected static environment: string;
    protected static apiVersion: string;
    protected static verifySslCerts: boolean;
    protected static caBundlePath: string;
    static setApiKey(apiKey: any): void;
    static setToken(token: string): void;
    static setEnvironment(value: string): void;
    static getEnvironment(): string;
    static getApiVersion(): string;
    static setVerifySslCerts(value: any): void;
    static getVerifySslCerts(): boolean;
    static setCaBundlePath(value: any): void;
    static getCaBundlePath(): string;
}
