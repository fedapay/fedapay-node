import { Resource, FedaPayObject } from '.';
export declare class Transaction extends Resource {
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Transaction>
     */
    static create(params?: {}, headers?: {}): Promise<Transaction>;
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
     * @returns Promise<Transaction>
     */
    static retrieve(id: any, headers?: {}): Promise<Transaction>;
    /**
     * @param id string The ID of the transaction to update.
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Transaction>
     */
    static update(id: any, params?: {}, headers?: {}): Promise<Transaction>;
    /**
     * @param array|string|null $headers
     *
     * @returns Promise<Transaction> The saved transaction.
     */
    save(headers?: {}): Promise<Transaction>;
    /**
     * @param array $headers
     *
     * @returns Transaction The deleted transaction.
     */
    delete(headers?: {}): Promise<Transaction>;
}
