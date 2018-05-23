import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';
export declare class Customer extends Resource {
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Customer>
     */
    static retrieve(id: any, headers?: {}): Promise<Customer>;
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<FedaPayObject>
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Customer>
     */
    static create(params?: {}, headers?: {}): Promise<Customer>;
    /**
     * @param id string The ID of the customer to update.
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Customer>
     */
    static update(id: any, params?: {}, headers?: {}): Promise<Customer>;
    /**
     * @param array|string|null $headers
     *
     * @returns Promise<Customer> The saved customer.
     */
    save(headers?: {}): Promise<Customer>;
    /**
     * @param array $headers
     *
     * @returns Customer The deleted customer.
     */
    delete(headers?: {}): Promise<Customer>;
}
