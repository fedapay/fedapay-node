import { Fedapay } from './Fedapay';
import request = require('request');

export class Requestor {
    readonly SANDBOX_BASE = 'https://sdx-api.fedapay.com';
    readonly PRODUCTION_BASE = 'https://api.fedapay.com';

    protected apiKey = '';
    protected token = '';
    protected environment = '';
    protected apiVersion = '';
    protected accountId = '';

    constructor() {
        this.apiKey = Fedapay.apiKey;
        this.token = Fedapay.token;
        this.environment = Fedapay.getEnvironment();
        this.apiVersion = Fedapay.getApiVersion();
        this.accountId = Fedapay.accountId;
    }

    httpClient() {
        let options = [];
        if (Fedapay.getVerifySslCerts()) {}
    }

    request(method: string, path: any, params = [], headers = []) {
        try {
            if (!headers) {
                headers = [];
            }
            if (!params) {
                params = [];
            }
            let url = this.url(path);
            method = method.toUpperCase();
            let options = {'headers': headers};

            request({
                method: method,
                uri: url,
                headers: headers,
            }, function (error?: any, response?: any, body?: any) {
                return response;
            });

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

    }

    protected url(path = '') {
        return `${this.baseUrl()}/${this.apiVersion}`;
    }

}