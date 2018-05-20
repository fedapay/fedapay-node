import { arrayToFedaPayObject, stripApiVersion } from './Util';

export class FedaPayObject {
    [key: string]: any;

    constructor(id = null, opts = null) {
        if (id !== null && typeof id === 'object') {
            this.refreshFrom(id, opts);
        } else if(id !== null) {
            this.id = id;
        }
    }

    refreshFrom(values: any, opts: any) {
        for (let k in values) {
            let value = values[k];
            if (typeof value === 'object') {
                k = stripApiVersion(k, opts);
                this[k] = arrayToFedaPayObject(value, opts);
            } else {
                this[k] = value;
            }
        }
    }

    serializeParameters(): any {
        let params: any = {};

        for (let key in this) {
            if (key == 'id') continue;

            let value: any = this[key];

            if(value instanceof FedaPayObject){
                let serialized = value.serializeParameters();
                if(serialized) {
                   params[key] = serialized;
                }
            } else if (typeof value !== 'function') {
               params[key] = value;
            }
        }

        return params;
    }
}
