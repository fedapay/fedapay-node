import { AxiosRequestConfig } from 'axios';
import { expect } from 'chai';
import { FedaPay, Requestor } from '../src';

const API_KEY = 'sk_test_123';
const OAUTH_TOKEN = 'oauth_test_token_123';
let lastRequestConfig: AxiosRequestConfig;

Requestor.addRequestInterceptor({
    callback: (config: AxiosRequestConfig) =>  {
        lastRequestConfig = config
        return config;
    }
});

export function setUp() {
    FedaPay.setApiKey(API_KEY);
}

export function tearDown() {
    FedaPay.setApiKey(null);
    FedaPay.setApiBase(null);
    FedaPay.setApiVersion('v1');
    FedaPay.setEnvironment('sandbox');
    FedaPay.setToken(null);
    FedaPay.setAccountId(null);
    FedaPay.setVerifySslCerts(true);
    Requestor.setHttpClient(null);
}

export function exceptRequest(config: AxiosRequestConfig) {
    expect(lastRequestConfig).to.include(config);
}
