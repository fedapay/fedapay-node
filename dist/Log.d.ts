import { Resource, FedaPayObject } from '.';
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
export declare class Log extends Resource {
    protected static ressourceName: string;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Event>}
     */
    static retrieve(id: any, headers?: {}): Promise<Log>;
    /**
     * Subscribe to logs flow
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static subscribe(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
