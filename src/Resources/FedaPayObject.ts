import { ArrayFactory } from './utils';

export class FedaPayObject {
    protected values: any;
    id: any;
    name: any;
    key: any;

    constructor(id = null, opts = null) {
        this.values = [];
        if (Array.isArray(id)) {
            this.refreshFrom(id, opts);
        } else if (typeof id === 'object') {
            /* const data: ArrayFactory = {

            };
            for (let key in id) {
                this.key = id[key];
            } */
        }else if(id) {
            this.id = id;
        }
    }

    refreshFrom(values: any, opts: any) {
    }

    buildProperties(data: any) {}
}