import { FedaPayObject } from './FedaPayObject';

export function convertToFedaPayObject(
    resp: any,
    opts: any
): FedaPayObject {
    let types: any = {
        // 'v1/api_key': 'FedaPay\\ApiKey',
        // 'v1/account': 'FedaPay\\Account',
        'v1/currency': require('./Currency').Currency,
        'v1/customer': require('./Customer').Customer,
        // 'v1/event': 'FedaPay\\Event',
        // 'v1/event_type': 'FedaPay\\EventType',
        // 'v1/invitation': 'FedaPay\\Invitation',
        // 'v1/log': 'FedaPay\\Log',
        // 'v1/role': 'FedaPay\\Role',
        // 'v1/setting': 'FedaPay\\Setting',
        // 'v1/transaction': 'FedaPay\\Transaction',
        // 'v1/user': 'FedaPay\\User',
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

export function stripApiVersion(key: any, opts: any): string {
    let apiPart = '';

    if (opts.apiVersion) {
        apiPart = `${opts.apiVersion}/`;
    }

    return key.replace(apiPart, '');
}
