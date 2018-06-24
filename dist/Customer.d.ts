import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';
export declare class Customer extends Resource {
    /**
     * @param {string|number} id The customer id
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    static retrieve(id: any, headers?: {}): Promise<Customer>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>}
     */
    static create(params?: {}, headers?: {}): Promise<Customer>;
    /**
     * @param {string|number} id The ID of the customer to update.
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>}
     */
    static update(id: any, params?: {}, headers?: {}): Promise<Customer>;
    /**
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>} The saved customer.
     */
    save(headers?: {}): Promise<Customer>;
    /**
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>} Customer The deleted customer.
     */
    delete(headers?: {}): Promise<Customer>;
}
