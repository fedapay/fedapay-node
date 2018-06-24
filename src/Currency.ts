import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';

export class Currency extends Resource {
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    static retrieve(id, headers = {}): Promise<Currency> {
        return <Promise<Currency>> this._retrieve(id, headers);
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
