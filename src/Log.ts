import { Resource, FedaPayObject, } from '.';

export class Log extends Resource {
    /**
     * @param params object|null
     * @param headers object|null
     *
     * @returns Promise<FedaPayObject>
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>>this._all(params, headers);
    }

    /**
     * @param id string|number
     * @param headers object|null
     * @returns Promise<Event>
     */
    static retrieve(id, headers = {}): Promise<Log> {
        return <Promise<Log>>this._retrieve(id, headers);
    }
}