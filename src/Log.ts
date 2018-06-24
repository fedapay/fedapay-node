import { Resource, FedaPayObject, } from '.';

export class Log extends Resource {
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>>this._all(params, headers);
    }

    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Event>}
     */
    static retrieve(id, headers = {}): Promise<Log> {
        return <Promise<Log>>this._retrieve(id, headers);
    }
}
