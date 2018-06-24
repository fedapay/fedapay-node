import { Resource, FedaPayObject } from '.';
export declare class Transaction extends Resource {
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static create(params?: {}, headers?: {}): Promise<Transaction>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static retrieve(id: any, headers?: {}): Promise<Transaction>;
    /**
     * @param {string|number} id string The ID of the transaction to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Transaction>}
     */
    static update(id: any, params?: {}, headers?: {}): Promise<Transaction>;
    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Transaction>} The saved transaction.
     */
    save(headers?: {}): Promise<Transaction>;
    /**
     * @param {array} $headers
     * @returns Transaction The deleted transaction.
     */
    delete(headers?: {}): Promise<Transaction>;
    /**
     * Generate token
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    generateToken(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
