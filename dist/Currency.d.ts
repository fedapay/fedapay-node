import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';
export declare class Currency extends Resource {
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Customer>
     */
    static retrieve(id: any, headers?: {}): Promise<Currency>;
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<FedaPayObject>
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
