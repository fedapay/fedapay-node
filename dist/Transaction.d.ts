import { Resource, FedaPayObject } from '.';
/**
 * Class Transaction
 *
 * @property int $id
 * @property string $reference
 * @property string $description
 * @property string $callback_url
 * @property string $amount
 * @property string $status
 * @property int $transaction_id
 * @property string $created_at
 * @property string $updated_at
 */
export declare class Transaction extends Resource {
    protected static ressourceName: string;
    /**
     * Available mobile money mode
     */
    private static AVAILABLE_MOBILE_MONEY;
    private static PAID_STATUS;
    /**
     * Check the transaction mode for send now request
     *
     * @param {string} mode
     * @return {boolean}
     */
    protected mobileMoneyModeAvailable(mode: any): boolean;
    /**
     * Check if the transaction was paid
     *
     * @return {boolean}
     */
    wasPaid(): boolean;
    /**
     * Check if the transacton was refunded. Status must include refunded.
     *
     * @return {boolean}
     */
    wasRefunded(): any;
    /**
     * Check if the transacton was partially refunded. Status must include partially_refunded.
     *
     * @return {boolean}
     */
    wasPartiallyRefunded(): boolean;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static create(params?: {}, headers?: {}): Promise<Transaction>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static retrieve(id: any, params?: {}, headers?: {}): Promise<Transaction>;
    /**
     * @param {string|number} id string The ID of the transaction to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Transaction>}
     */
    static update(id: any, params?: {}, headers?: {}): Promise<Transaction>;
    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Transaction>} The saved transaction.
     */
    save(headers?: {}): Promise<Transaction>;
    /**
     * @param {array} $headers
     * @returns Transaction The deleted transaction.
     */
    delete(headers?: {}): Promise<Transaction>;
    /**
     * Generate token
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    generateToken(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * Send Mobile Money request with token
     * @param {string} mode
     * @param {string} token
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    sendNowWithToken(mode: string, token: string, params?: any, headers?: {}): Promise<FedaPayObject>;
    /**
     * Send Mobile Money request
     * @param string mode
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    sendNow(mode: string, params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * Send fees request
     * @param string mode
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    getFees(token: string, mode: string, params?: any, headers?: {}): Promise<FedaPayObject>;
}
