export declare class Fedapay {
    readonly VERSION: string;
    apiKey: string;
    token: string;
    accountId: string;
    environment: string;
    apiVersion: string;
    verifySslCerts: boolean;
    caBundlePath: string;
    setApiKey(apiKey: any): void;
    getApiKey(): string;
    setToken(token: any): void;
    getCaBundlePath(): string;
}
