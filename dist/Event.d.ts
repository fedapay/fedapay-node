import { Resource, FedaPayObject } from '.';
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
export declare class Event extends Resource {
    protected static ressourceName: string;
    /**
     * @param {string|number} id The event id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Event>}
     */
    static retrieve(id: string | number, params?: {}, headers?: {}): Promise<Event>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * Subscribe to events flow
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static subscribe(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
