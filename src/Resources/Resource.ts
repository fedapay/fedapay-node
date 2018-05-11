import { FedaPayObject } from './FedaPayObject';
import { Requestor } from './Requestor';
import { Inflector } from './Inflector';

export class Resource extends FedaPayObject{
    protected static requestor: Requestor;

    static setRequestor(req: Requestor) {
        Resource.requestor = req;
    }

    static getRequestor(req: Requestor) {
        return Resource.requestor;
    }

    getName() {
        return (<any>this).constructor.name;
    }

    static className() {
        let instance = new this;
        return instance.getName().toLowerCase();
    }

    static classPath() {
        let base = this.className();
        let plural = Inflector.pluralize(base);
        return `/${plural}`;
    }

    static resourcePath(id: any) {
        if (id === null) {
            let klass = this.className();
            let message = `Could not determine which URL to request: ${klass} instance has invalid ID: ${id}`;
            throw new Error(message);
        }
        let base = this.classPath();
        let extn = encodeURI(id);
        return `${base}/${extn}`;
    }

    instanceUrl() {
        return Resource.resourcePath(this.id);
    }
}
