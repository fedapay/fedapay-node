import { Resource, FedaPayObject, } from '.';
import { arrayToFedaPayObject } from './Util';

/**
 * Class Log
 *
 * @property int $id
 * @property string $method
 * @property string $url
 * @property string $status
 * @property string $ip_address
 * @property string $version
 * @property string $source
 * @property string $query
 * @property string $body
 * @property string $response
 * @property int $account_id
 * @property string $created_at
 * @property string $updated_at
 */
export class Log extends Resource {
    protected static ressourceName = 'log';

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

    /**
     * Subscribe to logs flow
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static async subscribe(params = {}, headers = {}) : Promise<FedaPayObject> {
        const url = this.classPath() + '/subscribe';
        return this._staticRequest('post', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object;
            });
    }
}
