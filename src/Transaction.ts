import { Resource, FedaPayObject } from '.';
import { InvalidRequest } from './Error';
import { arrayToFedaPayObject } from './Util';
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
export class Transaction extends Resource {
    protected static ressourceName = 'transaction';

    /**
     * Available mobile money mode
     */
    private static AVAILABLE_MOBILE_MONEY = [
        'mtn', 'moov', 'mtn_ci', 'moov_tg', 'togocel', 'mtn_open'
    ];

    private static PAID_STATUS = [
        'approved', 'transferred', 'refunded',
        'approved_partially_refunded', 'transferred_partially_refunded'
    ];

    /**
     * Check the transaction mode for send now request
     *
     * @param {string} mode
     * @return {boolean}
     */
    protected mobileMoneyModeAvailable(mode): boolean {
        return Transaction.AVAILABLE_MOBILE_MONEY.includes(mode);
    }

    /**
     * Check if the transaction was paid
     *
     * @return {boolean}
     */
    public wasPaid(): boolean {
        return Transaction.PAID_STATUS.includes(this.status);
    }

    /**
     * Check if the transacton was refunded. Status must include refunded.
     *
     * @return {boolean}
     */
    public wasRefunded() {
        return this.status.includes('refunded');
    }

    /**
     * Check if the transacton was partially refunded. Status must include partially_refunded.
     *
     * @return {boolean}
     */
    public wasPartiallyRefunded(): boolean {
        return this.status.includes('partially_refunded');
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static create(params = {}, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._create(params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>> this._all(params, headers);
    }

    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    static retrieve(id, params = {}, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>> this._retrieve(id, params, headers);
    }

    /**
     * @param {string|number} id string The ID of the transaction to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Transaction>}
     */
    static update(id, params = {}, headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._update(id, params, headers);
    }

    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Transaction>} The saved transaction.
     */
    save(headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._save(headers);
    }

    /**
     * @param {array} $headers
     * @returns Transaction The deleted transaction.
     */
    delete(headers = {}): Promise<Transaction> {
        return <Promise<Transaction>>this._delete(headers);
    }

    /**
     * Generate token
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    generateToken(params = {}, headers = {}) : Promise<FedaPayObject> {
        const url = this.instanceUrl() + '/token';

        return Transaction._staticRequest('post', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object;
            });
    }

    /**
     * Send Mobile Money request with token
     * @param {string} mode
     * @param {string} token
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    sendNowWithToken(mode: string, token: string, params: any = {}, headers = {}) : Promise<FedaPayObject> {
        if (!this.mobileMoneyModeAvailable(mode)) {
            throw new InvalidRequest(
                `Invalid payment method '${mode}' supplied.
                You have to use one of the following payment methods
                [${Transaction.AVAILABLE_MOBILE_MONEY.join(',')}]`
            );
        }

        const url = '/' + mode;
        params.token = token;

        return Transaction._staticRequest('post', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object;
            });
    }

    /**
     * Send Mobile Money request
     * @param string mode
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    async sendNow(mode: string, params = {}, headers = {}) : Promise<FedaPayObject> {
        const tokenObject = await this.generateToken({}, headers);

        return this.sendNowWithToken(mode, tokenObject.token, params, headers);
    }

    /**
     * Send fees request
     * @param string mode
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    async getFees(token: string, mode: string, params: any = {}, headers = {}) : Promise<FedaPayObject> {
        const url = Transaction.classPath() + '/fees';
        params.token = token;
        params.mode = mode;

        return Transaction._staticRequest('get', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object;
            });
    }
}
