import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';

/**
 * Class Balance
 *
 * @property int $id
 * @property int $currency_id
 * @property int $account_id
 * @property int $amount
 * @property string $mode
 * @property string $deleted_at
 * @property string $created_at
 * @property string $updated_at
 */
export class Balance extends Resource {
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    static retrieve(id, headers = {}): Promise<Balance> {
        return <Promise<Balance>> this._retrieve(id, headers);
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
}
