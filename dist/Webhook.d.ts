import { Resource, FedaPayObject } from '.';
/**
 * Class Webhook
 *
 * @property int $id
 * @property string $url
 * @property string $created_at
 * @property string $updated_at
 */
export declare class Webhook extends Resource {
    protected static ressourceName: string;
    static DEFAULT_TOLERANCE: number;
    static constructEvent(payload: any, header: any, secret: any, tolerance?: any): any;
    /**
   * Generates a header to be used for webhook mocking
   *
   * @typedef {object} opts
   * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
   * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
   * @property {string} secret - FedaPay webhook secret 'wh_...'
   * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
   * @property {string} signature - Computed webhook signature
   */
    static generateTestHeaderString(opts?: any): string;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Webhook>}
     */
    static create(params?: {}, headers?: {}): Promise<Webhook>;
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Webhook>}
     */
    static retrieve(id: any, headers?: {}): Promise<Webhook>;
    /**
     * @param {string|number} id string The ID of the transaction to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Webhook>}
     */
    static update(id: any, params?: {}, headers?: {}): Promise<Webhook>;
    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Webhook>} The saved transaction.
     */
    save(headers?: {}): Promise<Webhook>;
    /**
     * @param {array} $headers
     * @returns Webhook The deleted transaction.
     */
    delete(headers?: {}): Promise<Webhook>;
    /**
     * Stub Event
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    static stubEvent(params?: {}, headers?: {}): Promise<FedaPayObject>;
    /**
     * Send astubbed event to the webhook
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    sendEvent(params?: {}, headers?: {}): Promise<FedaPayObject>;
}
export declare class WebhookSignature {
    static EXPECTED_SCHEME: string;
    static computeSignature(payload: any, secret: any): string;
    protected static parseHeader(header: any, scheme: string): {
        timestamp: number;
        signatures: any[];
    };
    static verifyHeader(payload: any, header: any, secret: any, tolerance?: any): boolean;
}
