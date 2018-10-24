import { Resource, FedaPayObject } from '.';
import { arrayToFedaPayObject } from './Util';

export interface IPayout {
    amount: number;
    customer: {
        id?: number;
        email?: string;
        firstname?: string;
        lastname?: string;
    }
}

export class Payout extends Resource {
    /**
     * Create a payout
     *
     * @param {IPayout|null} params 
     * @param headers 
     */
    static create(params: IPayout | null = null, headers: object | null = {}): Promise<Payout> {
        return <Promise<Payout>>this._create(params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static all(params: object | null = {}, headers: object | null = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>> this._all(params, headers);
    }

    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Payout>}
     */
    static retrieve(id: string | number, headers: object | null = {}): Promise<Payout> {
        return <Promise<Payout>> this._retrieve(id, headers);
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
     * Start scheduled payouts.
     *
     * @param {Array} payouts An array of payouts to start. At least one
     * @param {Date|null} scheduled_at Schedule date or null. If null, start now
     * @param headers 
     */
    static start(payouts: Array<number>, scheduled_at: Date|null = null, headers: object = {}) : Promise<FedaPayObject> {
        const url = this.resourcePath('start');

        const params = {
            payouts: []
        };

        payouts.forEach(id => {
            const schedule: any = { id };

            if (scheduled_at === null) {
                schedule.send_now = true;
            } else {
                schedule.scheduled_at = scheduled_at;
            }

            params.payouts.push(schedule);
        });

        return Payout._staticRequest('put', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object;
            });
    }
}
