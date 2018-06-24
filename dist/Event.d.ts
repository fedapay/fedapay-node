import { Resource, FedaPayObject } from '.';
export declare class Event extends Resource {
    /**
     * @param {string|number} id The event id
     * @param {Object|null} headers
     * @returns {Promise<Event>}
     */
    static retrieve(id: string | number, headers?: {}): Promise<Event>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
