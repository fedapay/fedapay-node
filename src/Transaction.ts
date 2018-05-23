import { Resource, FedaPayObject } from '.';

export class Transaction extends Resource {
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Transaction>
     */
    static create(params = {}, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._create(params, headers);
    }

    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<FedaPayObject>
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>> this._all(params, headers);
    }

    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Transaction>
     */
    static retrieve(id, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>> this._retrieve(id, headers);
    }

    /**
     * @param id string The ID of the transaction to update.
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Transaction>
     */
    static update(id, params = {}, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._update(id, params, headers);
    }

    /**
     * @param array|string|null $headers
     *
     * @returns Promise<Transaction> The saved transaction.
     */
    save(headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._save(headers);
    }

    /**
     * @param array $headers
     *
     * @returns Transaction The deleted transaction.
     */
    delete(headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._delete(headers);
    }
}