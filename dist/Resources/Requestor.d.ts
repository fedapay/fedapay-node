export declare class Requestor {
    readonly SANDBOX_BASE: string;
    readonly PRODUCTION_BASE: string;
    protected apiKey: string;
    protected token: string;
    protected environment: string;
    protected apiVersion: string;
    protected accountId: string;
    constructor();
    request(method: string, path: any, params?: never[], headers?: never[]): void;
    protected baseUrl(): "https://sdx-api.fedapay.com" | "https://api.fedapay.com" | undefined;
    protected url(path?: string): string;
}
