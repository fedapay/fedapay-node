import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';
export declare class Currency extends Resource {
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    static retrieve(id: any, headers?: {}): Promise<Currency>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
