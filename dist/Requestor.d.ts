import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export interface RequestInterceptor {
    callback: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRejected?: (error: any) => any;
}
export declare class Requestor {
    readonly SANDBOX_BASE: string;
    readonly PRODUCTION_BASE: string;
    protected apiKey: string;
    protected token: string;
    protected environment: string;
    protected apiVersion: string;
    protected accountId: string | number;
    protected static httpClient: AxiosInstance;
    protected static requestInterceptors: RequestInterceptor[];
    constructor();
    /**
     * Set the http client isntance
     * @param client AxiosInstance
     */
    static setHttpClient(client: AxiosInstance): void;
    /**
     * @returns
     */
    private httpClient();
    /**
     * Set the http client isntance
     * @param client AxiosInstance
     */
    static addRequestInterceptor(interceptor: RequestInterceptor): void;
    /**
     * Apply request interceptor
     * @param httpClient AxiosInstance
     */
    private applyRequestInterceptors(httpClient);
    request(method: string, path: any, params?: {}, headers?: {}): Promise<AxiosResponse<any>>;
    protected baseUrl(): "https://sdx-api.fedapay.com" | "https://api.fedapay.com";
    protected handleRequestException(e: any): Promise<never>;
    protected url(path?: string): string;
    protected defaultHeaders(): any;
}
