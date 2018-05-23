import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';
export declare class Account extends Resource {
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Account>
     */
    static retrieve(id: any, headers?: {}): Promise<Account>;
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
     * @returns Promise<Account>
     */
    static create(params?: {}, headers?: {}): Promise<Account>;
    /**
     * @param id string The ID of the acount to update.
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Account>
     */
    static update(id: any, params?: {}, headers?: {}): Promise<Account>;
    /**
     * @param array|string|null $headers
     *
     * @returns Promise<Account> The saved account.
     */
    save(headers?: {}): Promise<Account>;
    /**
     * @param array $headers
     *
     * @returns Account The deleted account.
     */
    delete(headers?: {}): Promise<Account>;
}
