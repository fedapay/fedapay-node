import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';

export class Currency extends Resource {
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Customer>
     */
    static retrieve(id, headers = {}): Promise<Currency> {
        return <Promise<Currency>> this._retrieve(id, headers);
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
}
