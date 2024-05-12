import { Resource, FedaPayObject } from '.';
/**
 * Class Payout
 *
 * @property int $id
 * @property string $reference
 * @property string $amount
 * @property string $status
 * @property int $customer_id
 * @property int $balance_id
 * @property string $mode
 * @property int $last_error_code
 * @property string $last_error_message
 * @property string $created_at
 * @property string $updated_at
 * @property string $scheduled_at
 * @property string $sent_at
 * @property string $failed_at
 * @property string $deleted_at
 */
export declare class Payout extends Resource {
    protected static ressourceName: string;
    /**
     * Create a payout
     *
     * @param {Object|null} params
     * @param headers
     */
    static create(params?: {}, headers?: object | null): Promise<Payout>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: object | null, headers?: object | null): Promise<FedaPayObject>;
    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Payout>}
     */
    static retrieve(id: string | number, params?: object | null, headers?: object | null): Promise<Payout>;
    /**
     * @param {string|number} id string The ID of the Payout to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Payout>}
     */
    static update(id: string | number, params?: object | null, headers?: object | null): Promise<Payout>;
    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Payout>} The saved Payout.
     */
    save(headers?: {}): Promise<Payout>;
    /**
     * @param {array} $headers
     * @returns Payout The deleted Payout.
     */
    delete(headers?: {}): Promise<Payout>;
    /**
     * @param {any} params
     * @param {any} headers
     *
     * @returns {Promise<Payout>}
     */
    protected _start(params: any, headers: any): Promise<Payout>;
    /**
     * @param {any} params
     * @param {any} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    protected static _startAll(params: any, headers: any): Promise<FedaPayObject>;
    /**
     * Send the payout now
     *
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<Payout>} The saved Payout.
     */
    sendNow(params?: {}, headers?: {}): Promise<Payout>;
    /**
     * Start the payout
     * @param {Date|string|number} scheduled_at
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<Payout>} The saved Payout.
     */
    schedule(scheduled_at: any, params?: {}, headers?: {}): Promise<Payout>;
    /**
     * Start a scheduled payout
     *
     * @param {array} payouts
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static scheduleAll(payouts?: any[], params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * Start a scheduled payout
     *
     * @param {array} payouts
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static sendAllNow(payouts?: any[], params?: {}, headers?: {}): Promise<FedaPayObject>;
}
