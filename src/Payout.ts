import { Resource, FedaPayObject } from '.';
import { arrayToFedaPayObject, toDateString } from './Util';

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
export class Payout extends Resource {
    protected static ressourceName = 'payout';

    /**
     * Create a payout
     *
     * @param {Object|null} params
     * @param headers
     */
    static create(params = {}, headers: object | null = {}): Promise<Payout> {
        return <Promise<Payout>>this._create(params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params: object | null = {}, headers: object | null = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>>this._all(params, headers);
    }

    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Payout>}
     */
    static retrieve(id: string | number, params: object | null = {}, headers: object | null = {}): Promise<Payout> {
        return <Promise<Payout>>this._retrieve(id, params, headers);
    }

    /**
     * @param {string|number} id string The ID of the Payout to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Payout>}
     */
    static update(id: string | number, params: object | null = {}, headers: object | null = {}): Promise<Payout> {
        return <Promise<Payout>>this._update(id, params, headers);
    }

    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Payout>} The saved Payout.
     */
    save(headers = {}): Promise<Payout> {
        return <Promise<Payout>>this._save(headers);
    }

    /**
     * @param {array} $headers
     * @returns Payout The deleted Payout.
     */
    delete(headers = {}): Promise<Payout> {
        return <Promise<Payout>>this._delete(headers);
    }

    /**
     * @param {any} params
     * @param {any} headers
     *
     * @returns {Promise<Payout>}
     */
    protected _start(params: any, headers: any): Promise<Payout> {
        const path = Payout.resourcePath('start');

        return Payout._staticRequest('put', path, params, headers)
            .then(({ data, options }) => {
                const object = arrayToFedaPayObject(data, options);

                this.refreshFrom(object['payouts'][0], options);

                return this;
            });
    }

    /**
     * @param {any} params
     * @param {any} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    protected static _startAll(params : any, headers: any): Promise<FedaPayObject> {
        const path = this.resourcePath('start');

        return <Promise<FedaPayObject>> this._staticRequest('put', path, params, headers)
            .then(({ data, options }) => {
                return arrayToFedaPayObject(data, options);
            });
    }

    /**
     * Send the payout now
     *
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<Payout>} The saved Payout.
     */
    sendNow(params: any = {}, headers: any = {}): Promise<Payout> {
        let payout_params: any = { id: this.id };

        if (params.phone_number) {
            payout_params.phone_number = params.phone_number;
            delete params.phone_number; // Remove phone_number from params
        }

        const _params = { payouts: [payout_params] };

        params = Object.assign(_params, params);

        return this._start(params, headers);
    }

    /**
     * Start the payout
     * @param {Date|string|number} scheduled_at
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<Payout>} The saved Payout.
     */
    schedule(scheduled_at, params: any = {}, headers: any = {})
    {
        scheduled_at = toDateString(scheduled_at);

        let payout_params: any = { id: this.id, scheduled_at: scheduled_at };

        if (params.phone_number) {
            payout_params.phone_number = params.phone_number;
            delete params.phone_number; // Remove phone_number from params
        }

        const _params = { payouts: [payout_params] };

        params = Object.assign(_params, params);

        return this._start(params, headers);
    }

    /**
     * Start a scheduled payout
     *
     * @param {array} payouts
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static scheduleAll(payouts: any[] = [], params = {}, headers = {})
    {
        let items = [];

        payouts.forEach((payout: any, index: number) => {
            let item: any = {};
            if (!payout['id']) {
                throw new Error(
                    'Invalid id argument. You must specify payout id.'
                );
            }
            item['id'] = payout['id'];

            if (payout['scheduled_at']) {
                item['scheduled_at'] = toDateString(payout['scheduled_at']);
            }

            if (params[index] && params[index]['phone_number']) {
              item['phone_number'] = params[index]['phone_number'];
              delete params[index]['phone_number']; // Remove phone_number from params
            }

            items.push(item);
        });

        const _params = {
            payouts: items
        };
        params = Object.assign(_params, params);

        return this._startAll(params, headers);
    }

    /**
     * Start a scheduled payout
     *
     * @param {array} payouts
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static sendAllNow(payouts: any[] = [], params = {}, headers = {})
    {
        let items = [];

        payouts.forEach((payout: any, index: number) => {
            let item: any = {};
            if (!payout['id']) {
                throw new Error(
                    'Invalid id argument. You must specify payout id.'
                );
            }
            item['id'] = payout['id'];

            if (params[index] && params[index]['phone_number']) {
                item['phone_number'] = params[index]['phone_number'];
                delete params[index]['phone_number']; // Remove phone_number from params
            }

            items.push(item);
        });

        const _params = {
            payouts: items
        };
        console.log(params);
        params = Object.assign(_params, params);

        return this._startAll(params, headers);
    }
}
