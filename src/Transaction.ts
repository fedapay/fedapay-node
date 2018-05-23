import { Resource, FedaPayObject } from '.';

export class Transaction extends Resource {
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
}