export declare class Requestor {
    readonly SANDBOX_BASE: string;
    readonly PRODUCTION_BASE: string;
    protected apiKey: string;
    protected token: string;
    protected environment: string;
    protected apiVersion: string;
    protected accountId: string;
    constructor();
    httpClient(): void;
    request(method: string, path: any, params?: {}, headers?: {}): Promise<any> | undefined;
    protected baseUrl(): "https://sdx-api.fedapay.com" | "https://api.fedapay.com" | undefined;
    protected handleRequestException(e: any): void;
    protected _url(path?: string): string;
}
