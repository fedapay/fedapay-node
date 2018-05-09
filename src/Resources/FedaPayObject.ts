import { stripApiVersion, arrayToFedaPayObject } from './Utils';

export class FedaPayObject {
    protected values: any;
    id: any;
    name: any;

    constructor(id = null, opts = null) {
        this.values = [];
        if (id !== null && typeof id === 'object') {
            this.refreshFrom(id, opts);
        } else if(id !== null) {
            this.id = id;
        }
    }

    refreshFrom(values: any, opts: any) {
        for (let k in values) {
            let value = values[k];
            if (value !== null && typeof value === 'object') {
                k = stripApiVersion(k, opts);
                (<any>this)[k] = arrayToFedaPayObject(value, opts);
            } else {
                (<any>this)[k] = value;
            }
        }
    }

    serializeParameters() {
        let params = {};
        for (let key in this.values) {
            if(key == 'id') continue;
            let value = this.values[key];
            if(value instanceof FedaPayObject){
                let serialized = value.serializeParameters();
                if(serialized) {
//                    params[key] = serialized;
                }
            } else {
//                params[key] = value;
            }
        }
    }
}