import { FedaPayObject, Currency, Customer } from '..';

export function stripApiVersion(key: any, opts: any) {
    let apiPart = '';
    let apiVersion = opts['apiVersion'];
    if (Array.isArray(opts) && apiVersion) {
        apiPart = `${apiVersion}/`;
    }
    return key.replace(apiPart, '');
}

export function arrayToFedaPayObject(array: any, opts: any) {
    if (Array.isArray(array)) {
        let mapped: Array<any> = [];
        array.forEach(i => {
            mapped.push(convertToFedaPayObject(i, opts));
        });
        return mapped;
    } else {
        return convertToFedaPayObject(array, opts);
    }
}

export function objectToFedaPayObject(attrs: any = {}, opts: any = {}, className: string) {
    // klass
    // if array make a loop
    let objects: Array<Currency> = [];
    switch (className) {
        case 'currency':
            objects.push(new Currency(attrs));
    }

    return objects;
}

export function convertToFedaPayObject(resp: any, opts: any) {
    let types = {
        // 'v1/api_key': 'FedaPay\\ApiKey',
        // 'v1/account': 'FedaPay\\Account',
        // 'v1/currency': 'FedaPay\\Currency',
        // 'v1/customer': 'FedaPay\\Customer',
        // 'v1/event': 'FedaPay\\Event',
        // 'v1/event_type': 'FedaPay\\EventType',
        // 'v1/invitation': 'FedaPay\\Invitation',
        // 'v1/log': 'FedaPay\\Log',
        // 'v1/role': 'FedaPay\\Role',
        // 'v1/setting': 'FedaPay\\Setting',
        // 'v1/transaction': 'FedaPay\\Transaction',
        // 'v1/user': 'FedaPay\\User',
    };
    let kklass = FedaPayObject;

    if (resp['klass']) {
        let klass = resp['klass'];
        /* if (types.klass) {
            let kklass = types.klass;
        } */
    }

    let object = new kklass;
    object.refreshFrom(resp, opts);

    return object;
}

export function isList(array: any) {
    if(!Array.isArray(array)) return false;
    array.map(
        (key: number, value: any) => {
            if (!isNumeric(key)) return false;
        }
    );
    return true;
}

function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


