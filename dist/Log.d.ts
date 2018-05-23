import { Resource, FedaPayObject } from '.';
export declare class Log extends Resource {
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<FedaPayObject>
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Event>
     */
    static retrieve(id: any, headers?: {}): Promise<Log>;
}
