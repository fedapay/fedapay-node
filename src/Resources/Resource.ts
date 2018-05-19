import { FedaPay } from './FedaPay';
import { FedaPayObject } from './FedaPayObject';
import { Inflector } from './Inflector';
import { Requestor } from './Requestor';
import { arrayToFedaPayObject, objectToFedaPayObject } from './Utils';

export class Resource extends FedaPayObject {
    protected static requestor: Requestor = new Requestor();

    static setRequestor(req: Requestor) {
        Resource.requestor = req;
    }

    static getRequestor(req: Requestor) {
        return Resource.requestor;
    }

    getName() {
        return (<any>this).constructor.name;
    }

    static className(): string {
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

    static retrieve(id: any, headers = []) {
        let url = this.resourcePath(id);
        let className = this.className();

        let response, opts = this.staticRequest('get', url);
        let object = arrayToFedaPayObject(response, opts);

        return object.toString();
    }

    static async staticRequest(method: any, url: any, params: any = null, headers: any = null) {
        let requestor = this.requestor;
        let response = null;
        let res = await requestor.request(method, url, params, headers);

        let options = {
            'apiVersion': FedaPay.getApiVersion(),
            'environment': FedaPay.getEnvironment()
        };
        return {
            res,
            options
        };
    }

    static async all(params: any = {}, headers: any = {}) {
        this.validateParams(params);
        let path = this.classPath();
        let data = await this.staticRequest('get', path, params, headers)
            .then(({ res, options}) => {
                return {
                    res, options
                };
            });
        return await objectToFedaPayObject(data.res, data.options, this.className());
    }

    static validateParams(params = null) {
        if (typeof params != 'object') {
            let message = `You must pass an object as the first argument to FedaPay API
            method calls.  (HINT: an example call to create a customer
            would be: FedaPay.Customer.create({'firstname': toto,
            'lastname': 'zoro', 'email': 'admin@gmail.com', 'phone': '66666666'})`;
            throw new Error(message);
        }
    }

    static create(params: any, headers: any) {
        this.validateParams(params);
        let url = this.classPath();

        let response, opts = this.staticRequest('post', url, params, headers);
        let object = arrayToFedaPayObject(response, opts);

        return object;
    }

    static update(params: any, headers: any) {
        this.validateParams(params);
        let url = this.classPath();

        let response, opts = this.staticRequest('put', url, params, headers);
        let object = arrayToFedaPayObject(response, opts);

        return object;
    }

    delete(headers: any) {
        let url = this.instanceUrl();
        Resource.staticRequest('delete', url, [], headers);
        return this;
    }

    protected save(headers: any) {
        let params = this.serializeParameters();
        let className = Resource.className();
        let url = this.instanceUrl();

        let response, opts = Resource.staticRequest('PUT', url, params, headers);
        let klass = `${opts} / ${className}`; // TODO

        return this;

    }
}
