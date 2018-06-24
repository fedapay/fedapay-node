import { Resource, FedaPayObject } from '.';


export class Event extends Resource{
    /**
     * @param {string|number} id The event id
     * @param {Object|null} headers
     * @returns {Promise<Event>}
     */
    static retrieve(id: string|number, headers = {}): Promise<Event> {
        return <Promise<Event>>this._retrieve(id, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>>this._all(params, headers);
    }
}
