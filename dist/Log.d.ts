import { Resource, FedaPayObject } from '.';
export declare class Log extends Resource {
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Event>}
     */
    static retrieve(id: any, headers?: {}): Promise<Log>;
}
