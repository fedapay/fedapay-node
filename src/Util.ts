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
