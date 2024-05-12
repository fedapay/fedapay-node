import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';

/**
 * Class Account
 *
 * @property int $id
 * @property string $name
 * @property string $timezone
 * @property string $country
 * @property string $verify
 * @property string $created_at
 * @property string $updated_at
 */
export class Account extends Resource {
    protected static ressourceName = 'account';

    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Account>}
     */
    static retrieve(id, params = {}, headers = {}): Promise<Account> {
        return <Promise<Account>> this._retrieve(id, params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>> this._all(params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Account>}
     */
    static create(params = {}, headers = {}): Promise<Account> {
        return <Promise<Account>> this._create(params, headers);
    }

    /**
     * @param {string} id The ID of the acount to update.
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Account>}
     */
    static update(id, params = {}, headers = {}): Promise<Account> {
        return <Promise<Account>> this._update(id, params, headers);
    }

    /**
     * @param {Object|string|null} headers
     *
     * @returns {Promise<Account>} The saved account.
     */
    save(headers = {}): Promise<Account> {
        return <Promise<Account>> this._save(headers);
    }

    /**
     * @param {Object} headers
     *
     * @returns {<Promise<Account>>} Account The deleted account.
     */
    delete(headers = {}): Promise<Account> {
        return <Promise<Account>> this._delete(headers);
    }
}
