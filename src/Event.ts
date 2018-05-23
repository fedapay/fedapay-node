import { Resource, FedaPayObject } from '.';


export class Event extends Resource{
    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Event>
     */
    static retrieve(id, headers = {}): Promise<Event> {
        return <Promise<Event>>this._retrieve(id, headers);
    }

    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<FedaPayObject>
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>>this._all(params, headers);
    }
}