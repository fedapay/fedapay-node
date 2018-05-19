import { FedaPay } from './FedaPay';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export class Requestor {
    readonly SANDBOX_BASE = 'https://sdx-api.fedapay.com';
    readonly PRODUCTION_BASE = 'https://api.fedapay.com';

    protected apiKey = '';
    protected token = '';
    protected environment = '';
    protected apiVersion = '';
    protected accountId = '';

    constructor() {
        this.apiKey = FedaPay.apiKey;
        this.token = FedaPay.token;
        this.environment = FedaPay.getEnvironment();
        this.apiVersion = FedaPay.getApiVersion();
        this.accountId = FedaPay.accountId;
    }

    httpClient() {
        let options = [];
        if (FedaPay.getVerifySslCerts()) {}
    }

    request(method: string, path: any, params = {}, headers = {}) {
        try {
            if (!headers) {
                headers = {};
            }
            if (!params) {
                params = {};
            }
            let url = this._url(path);
            method = method.toUpperCase();
            let options: { [key: string]: any } = {}
            options.headers = headers;

            switch (method) {
                case 'GET':
                case 'HEAD':
                case 'DELETE':
                    options.query = params;
                    break;
                default:
                    options.json = params;
                    break;
            }
            let res = axios({
                method: method,
                url: url,
                headers: options.headers
            })
            .then(function (response) {
                return response.data;
            });
            return res;
        } catch (error) {
            this.handleRequestException(error);
        }
    }

    protected baseUrl() {
        switch (this.environment) {
            case 'development':
            case 'sandbox':
            case 'test':
            case null:
                return this.SANDBOX_BASE;
            case 'production':
            case 'live':
                return this.PRODUCTION_BASE;
        }
    }

    protected handleRequestException(e: any) {
        throw new Error(e);
    }

    protected _url(path = '') {
        return `${this.baseUrl()}/${this.apiVersion}${path}`;
    }
}
