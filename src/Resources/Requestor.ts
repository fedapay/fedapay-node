import { Fedapay } from './Fedapay';
let request = require('request');

export class Requestor {
    readonly SANDBOX_BASE = 'https://sdx-api.fedapay.com';
    readonly PRODUCTION_BASE = 'https://api.fedapay.com';

    protected apiKey = '';
    protected token = '';
    protected environment = '';
    protected apiVersion = '';
    protected accountId = '';

    constructor() {
        this.apiKey = new Fedapay().apiKey;
        this.token = new Fedapay().token;
        this.environment = new Fedapay().environment;
        this.apiVersion = new Fedapay().apiVersion;
        this.accountId = new Fedapay().accountId;
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
                console.log(error, response, body);
            });

        } catch (error) {
            
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

    protected url(path = '') {
        return `${this.baseUrl()}/${this.apiVersion}`;
    }

}