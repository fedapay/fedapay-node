import * as crypto from 'crypto';
import { FedaPayObject } from './FedaPayObject';

/**
 * Convert response to FedaPayObject
 * @param {any} resp
 * @param {any} opts
 */
export function convertToFedaPayObject(
    resp: any,
    opts: any
): FedaPayObject {
    let types: any = {
        'v1/api_key': require('./ApiKey').ApiKey,
        'v1/account': require('./Account').Account,
        'v1/currency': require('./Currency').Currency,
        'v1/customer': require('./Customer').Customer,
        'v1/event': require('./Event').Event,
        'v1/log': require('./Log').Log,
        'v1/phone_number': require('./PhoneNumber').PhoneNumber,
        'v1/transaction': require('./Transaction').Transaction,
        'v1/payout': require('./Payout').Payout,
        'v1/webhook': require('./Webhook').Webhook,
        'v1/balance': require('./Balance').Balance,
    };
    let object = new FedaPayObject;
    if (resp['klass']) {
        let klass = resp['klass'];

        if (types[klass]) {
            object = new types[klass]();
        }
    }

    object.refreshFrom(resp, opts);

    return object;
}

/**
 * Convert array response to FedaPayObject
 * @param {any} array
 * @param {any} opts
 */
export function arrayToFedaPayObject(
    array: any,
    opts: any
): FedaPayObject | FedaPayObject[] {
    if (Array.isArray(array)) {
        let mapped: FedaPayObject[] = [];

        array.forEach(i => {
            mapped.push(convertToFedaPayObject(i, opts));
        });

        return mapped;
    } else {
        return convertToFedaPayObject(array, opts);
    }
}

/**
 * Strip api version from key
 * @param {any} key
 * @param {any} opts
 */
export function stripApiVersion(key: any, opts: any): string {
    let apiPart = '';

    if (opts.apiVersion) {
        apiPart = `${opts.apiVersion}/`;
    }

    return key.replace(apiPart, '');
}

/**
 * Check a date falue
 * @param mixed $date
 * @return mixed
 */
export function toDateString(date: any)
{
    if (date instanceof Date) {
        return date.toISOString();
    } else if (typeof date == 'string' || typeof date == 'number') {
        return date;
    } else {
        throw new Error(
            'Invalid datetime argument. Should be a date in string format, ' +
            ' a timestamp  or an instance of Date.'
        );
    }
}

/**
   * Secure compare, from https://github.com/freewil/scmp
   */
export function secureCompare(a, b) {
    a = Buffer.from(a);
    b = Buffer.from(b);

    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (a.length !== b.length) {
        return false;
    }

    // use crypto.timingSafeEqual if available (since Node.js v6.6.0),
    // otherwise use our own scmp-internal function.
    if (crypto.timingSafeEqual) {
        return crypto.timingSafeEqual(a, b);
    }

    const len = a.length;
    let result = 0;

    for (let i = 0; i < len; ++i) {
        result |= a[i] ^ b[i];
    }
    return result === 0;
}
