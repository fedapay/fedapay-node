

export class FedapayObject {
    protected values: any;
    id: any;

    constructor(id = null, opts = null) {
        this.values = [];
        if (Array.isArray(id)) {
            this.refreshFrom(id, opts);
        } else if (id !== null) {
            this.id = id;
        }
    }

    refreshFrom(id = null, opts = null) {}
}