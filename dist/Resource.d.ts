import { FedaPayObject } from './FedaPayObject';
import { Requestor } from './Requestor';
/**
 * Class Resource
 */
export declare class Resource extends FedaPayObject {
    protected static requestor: Requestor;
    protected static ressourceName: string;
    /**
     * Set requestor
     * @param {Requestor} req
     */
    static setRequestor(req: Requestor): void;
    /**
     * Return the requestor
     * @returns {Requestor}
     */
    static getRequestor(): Requestor;
    /**
     * Return class name
     * @returns {string}
     */
    static className(): string;
    /**
     * Return the class path
     * @return {string}
     */
    static classPath(): string;
    /**
     * Return the resource path
     * @param {number|string} id
     * @returns {string}
     */
    static resourcePath(id: number | string): string;
    /**
     * Return the instance url
     * @returns {string}
     */
    instanceUrl(): any;
    /**
     * Validate params
     * @param {Object|null} params
     */
    protected static _validateParams(params?: any): void;
    /**
     * Send static request
     * @param {string} method
     * @param {string} url
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<AxiosResponse<any>>}
     */
    protected static _staticRequest(method: string, url: string, params?: any, headers?: any): Promise<{
        data: any;
        options: {
            apiVersion: string;
            environment: string;
        };
    }>;
    /**
     * Retrieve resource
     * @param {string|number} id
     * @param {Object|null} headers
     */
    protected static _retrieve(id: any, params?: any, headers?: any): Promise<FedaPayObject>;
    /**
     * Send list reource request
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject|FedaPayObject[]>}
     */
    protected static _all(params?: {}, headers?: {}): Promise<FedaPayObject | FedaPayObject[]>;
    /**
     * Send create resource request
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    protected static _create(params: any, headers: any): Promise<FedaPayObject>;
    /**
     * Send create resource request
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    protected static _update(id: any, params: any, headers: any): Promise<FedaPayObject>;
    /**
     * Send delete resource request
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    protected _delete(headers: any): Promise<FedaPayObject>;
    /**
     * Send create or update resource request
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    protected _save(headers: any): Promise<FedaPayObject>;
}
