import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';

export class Account extends Resource {
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Account>
     */
    static retrieve(id, headers = {}): Promise<Account> {
        return <Promise<Account>> this._retrieve(id, headers);
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
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Account>
     */
    static create(params = {}, headers = {}): Promise<Account> {
        return <Promise<Account>> this._create(params, headers);
    }

    /**
     * @param id string The ID of the acount to update.
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<Account>
     */
    static update(id, params = {}, headers = {}): Promise<Account> {
        return <Promise<Account>> this._update(id, params, headers);
    }

    /**
     * @param array|string|null $headers
     *
     * @returns Promise<Account> The saved account.
     */
    save(headers = {}): Promise<Account> {
        return <Promise<Account>> this._save(headers);
    }

    /**
     * @param array $headers
     *
     * @returns Account The deleted account.
     */
    delete(headers = {}): Promise<Account> {
        return <Promise<Account>> this._delete(headers);
    }
}
