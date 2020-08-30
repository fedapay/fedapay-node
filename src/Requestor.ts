import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiConnectionError } from './Error';
import { FedaPay } from './FedaPay';

export interface RequestInterceptor {
    callback: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRejected?: (error: any) => any
};

/**
* Class Requestor
*/
export class Requestor {
    readonly SANDBOX_BASE = 'https://sandbox-api.fedapay.com';
    readonly PRODUCTION_BASE = 'https://api.fedapay.com';
    readonly DEVELOPMENT_BASE = 'https://dev-api.fedapay.com';

    protected static httpClient: AxiosInstance;
    protected static requestInterceptors: RequestInterceptor[] = [];

    /**
     * Set the http client isntance
     * @param {AxiosInstance} client
     */
    static setHttpClient(client: AxiosInstance) {
        Requestor.httpClient = client;
    }

    /**
     * Return the httpClient
     * @returns {AxiosInstance}
     */
    private httpClient(): AxiosInstance {
        if (!Requestor.httpClient) {
            let options = {};

            if (FedaPay.getVerifySslCerts()) {
                // TODO Set ca bundle file to the request
            }

            Requestor.httpClient = axios.create(options);
            this.applyRequestInterceptors(Requestor.httpClient);
        }

        return Requestor.httpClient;
    }


    /**
     * Set the http client isntance
     * @param {AxiosInstance} client
     */
    static addRequestInterceptor(interceptor: RequestInterceptor) {
        this.requestInterceptors.push(interceptor);
    }

    /**
     * Apply request interceptor
     * @param {AxiosInstance} httpClient
     */
    private applyRequestInterceptors(httpClient: AxiosInstance) {
        Requestor.requestInterceptors.forEach(interceptor => {
            httpClient.interceptors.request.use(
                interceptor.callback, interceptor.onRejected
            );
        })
    }

    /**
     * Sent request
     * @param {string} method
     * @param {string} path
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
    request(
        method: string,
        path: string,
        params = {},
        headers = {}
    ): Promise<AxiosResponse<any>> {
        let url = this.url(path);
        method = method.toUpperCase();
        headers = Object.assign(this.defaultHeaders(), headers);

        let requestConfig: AxiosRequestConfig = {
            method,
            url,
            headers,
            responseType: 'json'
        }

        if (['GET', 'HEAD', 'DELETE'].indexOf(method) > -1) {
            requestConfig['params'] = params;
        } else {
            requestConfig['data'] = params;
        }

        return this.httpClient().request(requestConfig)
            .catch(this.handleRequestException);
    }

    /**
     * Return base url
     * @returns {string}
     */
    protected baseUrl(): string {
        const apiBase = FedaPay.getApiBase();
        const environment = FedaPay.getEnvironment();

        if (apiBase) {
            return apiBase;
        }

        switch (environment) {
            case 'development':
            case 'dev':
                return this.DEVELOPMENT_BASE;
            case 'sandbox':
            case 'test':
            case null:
                return this.SANDBOX_BASE;
            case 'production':
            case 'live':
                return this.PRODUCTION_BASE;
        }
    }

    /**
     * Handle request exception
     * @param {any} e
     * @returns {Promise<ApiConnectionError>}
     */
    protected handleRequestException(e: any) {
        let message = `Request error: ${e.message}`;
        let httpStatusCode = e.response ? e.response.status : null;
        let httpRequest = e.request;
        let httpResponse = e.response;

        return Promise.reject(new ApiConnectionError(
            message,
            httpStatusCode,
            httpRequest,
            httpResponse
        ));
    }

    /**
     * Return the url
     * @param {string} path
     */
    protected url(path = '') {
        return `${this.baseUrl()}/${FedaPay.getApiVersion()}${path}`;
    }

    /**
     * Return default headers
     * @returns {Object}
     */
    protected defaultHeaders() {
        const token = FedaPay.getApiKey() || FedaPay.getToken();
        const accountId = FedaPay.getAccountId();

        let _default: any = {
            'X-Version': FedaPay.VERSION,
            'X-Source': 'FedaPay NodeLib',
            'Authorization': 'Bearer ' + token
        };

        if (accountId) {
            _default['FedaPay-Account'] = accountId;
        }

        return _default;
    }
}
