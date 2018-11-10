import { Resource, FedaPayObject } from '.';
import { arrayToFedaPayObject } from './Util';

/**
 * Class Transaction
 *
 * @property int $id
 * @property string $reference
 * @property string $description
 * @property string $callback_url
 * @property string $amount
 * @property string $status
 * @property int $transaction_id
 * @property string $created_at
 * @property string $updated_at
 */
export class Transaction extends Resource {
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static create(params = {}, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._create(params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>> this._all(params, headers);
    }

    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static retrieve(id, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>> this._retrieve(id, headers);
    }

    /**
     * @param {string|number} id string The ID of the transaction to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Transaction>}
     */
    static update(id, params = {}, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._update(id, params, headers);
    }

    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Transaction>} The saved transaction.
     */
    save(headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._save(headers);
    }

    /**
     * @param {array} $headers
     * @returns Transaction The deleted transaction.
     */
    delete(headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._delete(headers);
    }

    /**
     * Generate token
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    generateToken(params = {}, headers = {}) : Promise<FedaPayObject> {
        const url = this.instanceUrl() + '/token';

        return Transaction._staticRequest('post', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object;
            });
    }
}
