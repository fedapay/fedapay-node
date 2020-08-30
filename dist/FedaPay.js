"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FedaPay = void 0;
var path = require("path");
/**
 * Class FedaPay
 */
var FedaPay = /** @class */ (function () {
    function FedaPay() {
    }
    /**
     * Return the api key
     * @return {string}
     */
    FedaPay.getApiKey = function () {
        return FedaPay.apiKey;
    };
    /**
     * Set api key
     * @param {string} apiKey
     */
    FedaPay.setApiKey = function (apiKey) {
        FedaPay.apiKey = apiKey;
        FedaPay.token = '';
    };
    /**
     * Return the api key
     * @return {string}
     */
    FedaPay.getApiBase = function () {
        return FedaPay.apiBase;
    };
    /**
     * Set api key
     * @param {string} apiBase
     */
    FedaPay.setApiBase = function (apiBase) {
        FedaPay.apiBase = apiBase;
    };
    /**
     * Return the token
     * @returns {string}
     */
    FedaPay.getToken = function () {
        return FedaPay.token;
    };
    /**
     * Set token
     * @param {string} token
     */
    FedaPay.setToken = function (token) {
        FedaPay.token = token;
    };
    /**
     * Return the token
     * @returns {string}
     */
    FedaPay.getAccountId = function () {
        return FedaPay.accountId;
    };
    /**
     * Set the account id
     * @param {string|number} accountId
     */
    FedaPay.setAccountId = function (accountId) {
        FedaPay.accountId = accountId;
    };
    /**
     * Set the environment
     * @param {string} value
     */
    FedaPay.setEnvironment = function (value) {
        FedaPay.environment = value;
    };
    /**
     * Get the environment
     * @return {string}
     */
    FedaPay.getEnvironment = function () {
        return FedaPay.environment;
    };
    /**
     * Retutn the api version
     * @return {string}
     */
    FedaPay.getApiVersion = function () {
        return FedaPay.apiVersion;
    };
    /**
     * Set api version
     * @param {string} version
     */
    FedaPay.setApiVersion = function (version) {
        FedaPay.apiVersion = version;
    };
    /**
     * @param {boolean} value The verify ssl certificates value.
     * @return {void}
     */
    FedaPay.setVerifySslCerts = function (value) {
        FedaPay.verifySslCerts = value;
    };
    /**
     * @return {boolean} Determine if the request should verify SSL certificate.
     */
    FedaPay.getVerifySslCerts = function () {
        return FedaPay.verifySslCerts;
    };
    /**
     * Set the ca bundle path
     * @param {string} value
     */
    FedaPay.setCaBundlePath = function (value) {
        FedaPay.caBundlePath = value;
    };
    /**
     * Get the ca bundle path
     * @return {string}
     */
    FedaPay.getCaBundlePath = function () {
        if (!FedaPay.caBundlePath) {
            FedaPay.caBundlePath = path.join(__dirname, '/../data/ca-certificates.crt');
        }
        return FedaPay.caBundlePath;
    };
    FedaPay.VERSION = '1.1.1';
    FedaPay.token = '';
    FedaPay.accountId = '';
    FedaPay.environment = 'sandbox';
    FedaPay.apiVersion = 'v1';
    FedaPay.verifySslCerts = true;
    FedaPay.caBundlePath = '';
    return FedaPay;
}());
exports.FedaPay = FedaPay;
