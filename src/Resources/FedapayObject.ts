

export class FedapayObject {
    protected values: any;
    id: any;
    name: any;

    constructor(id = null, opts = null) {
        this.values = [];
        if (Array.isArray(id)) {
            this.refreshFrom(id, opts);
        } else if (id) {
            this.id = id;
        }
    }

    refreshFrom(values: any, opts: any) {
    }
}