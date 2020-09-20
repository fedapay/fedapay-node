import { Resource, FedaPayObject } from '.';
import { arrayToFedaPayObject } from './Util';

/**
 * Class Event
 *
 * @property int $id
 * @property string $type
 * @property string $entity
 * @property int $object_id
 * @property int $account_id
 * @property string $object
 * @property string $created_at
 * @property string $updated_at
 */
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

    /**
     * Subscribe to events flow
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static async subscribe(params = {}, headers = {}) : Promise<FedaPayObject> {
        return Event._staticRequest('post', '/subscribe', params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object;
            });
    }
}
