import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';

/**
 * Class Currency
 *
 * @property int $id
 * @property string $name
 * @property string $iso
 * @property int $code
 * @property string $prefix
 * @property string $suffix
 * @property string $div
 * @property string $created_at
 * @property string $updated_at
 */
export class Currency extends Resource {
    protected static ressourceName = 'currency';

    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    static retrieve(id, params = {}, headers = {}): Promise<Currency> {
        return <Promise<Currency>> this._retrieve(id, params, headers);
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
