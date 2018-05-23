import { Resource, FedaPayObject } from '.';
export declare class Event extends Resource {
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Event>
     */
    static retrieve(id: any, headers?: {}): Promise<Event>;
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<FedaPayObject>
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
