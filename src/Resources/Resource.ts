import { FedaPayObject } from './FedaPayObject';
import { Requestor } from './Requestor';

export class Resource extends FedaPayObject{
    protected static requestor: Requestor;

    static setRequestor(req: Requestor) {
        Resource.requestor = req;
    }

    static getRequestor(req: Requestor) {
        return Resource.requestor;
    }

    static className() {
        let instance = new Resource();
        let klass = instance.constructor().name;
        return klass;
    }

    static classPath() {
    }

}
