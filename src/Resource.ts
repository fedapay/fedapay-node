import * as pluralize from 'pluralize';
import { InvalidRequest } from './Error';
import { FedaPay } from './FedaPay';
import { FedaPayObject } from './FedaPayObject';
import { Requestor } from './Requestor';
import { arrayToFedaPayObject } from './Util';

export class Resource extends FedaPayObject {
    protected static requestor: Requestor = new Requestor();

    static setRequestor(req: Requestor) {
        Resource.requestor = req;
    }

    static getRequestor(req: Requestor) {
        return Resource.requestor;
    }

    static className(): string {
        return this.name.toLowerCase();
    }

    static classPath() {
        let base = this.className();
        let plural = pluralize(base);

        return `/${plural}`;
    }

    static resourcePath(id: number | string) {
        if (id === null) {
            let klass = this.className();
            let message = `Could not determine which URL to request: ${klass} instance has invalid ID: ${id}`;

            throw new InvalidRequest(message);
        }

        let base = this.classPath();
        let extn = encodeURI(`${id}`);

        return `${base}/${extn}`;
    }

    instanceUrl() {
        return (<any>this).constructor.resourcePath(this.id);
    }

    protected static _validateParams(params = null) {
        if (params && typeof params != 'object') {
            let message = `You must pass an object as the first argument to FedaPay API
            method calls.  (HINT: an example call to create a customer
            would be: FedaPay.Customer.create({'firstname': toto,
            'lastname': 'zoro', 'email': 'admin@gmail.com', 'phone': '66666666'})`;
            throw new InvalidRequest(message);
        }
    }

    protected static _staticRequest(
        method: any,
        url: any,
        params: any = {},
        headers: any = {}
    ) {
        return this.requestor.request(method, url, params, headers)
            .then(response => {
                let options = {
                    'apiVersion': FedaPay.getApiVersion(),
                    'environment': FedaPay.getEnvironment()
                };

                return { data: response.data, options };
            });
    }

    protected static _retrieve(
        id: any,
        headers: any = {}
    ): Promise<FedaPayObject> {
        let url = this.resourcePath(id);
        let className = this.className();

        return this._staticRequest('get', url, null, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object[className];
            });
    }

    protected static _all(
        params: any = {},
        headers: any = {}
    ): Promise<FedaPayObject|FedaPayObject[]> {
        this._validateParams(params);

        let path = this.classPath();

        return this._staticRequest('get', path, params, headers)
            .then(({ data, options }) => {
                return arrayToFedaPayObject(data, options);
            })
    }

    protected static _create(
        params: any,
        headers: any
    ): Promise<FedaPayObject> {
        this._validateParams(params);
        let url = this.classPath();
        let className = this.className();

        return this._staticRequest('post', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object[className];
            });
    }

    protected static _update(
        id,
        params: any,
        headers: any
    ): Promise<FedaPayObject> {
        this._validateParams(params);
        let url = this.resourcePath(id);
        let className = this.className();

        return this._staticRequest('put', url, params, headers)
            .then(({ data, options }) => {
                let object = <FedaPayObject>arrayToFedaPayObject(data, options);

                return <FedaPayObject>object[className];
            });
    }

    protected _delete(headers: any): Promise<FedaPayObject> {
        let url = this.instanceUrl();
        return Resource._staticRequest('delete', url, [], headers)
            .then(({ data, options }) => {
                return this;
            });
    }

    protected _save(headers: any): Promise<FedaPayObject> {
        let params = this.serializeParameters();
        let className = Resource.className();
        let url = this.instanceUrl();

        return Resource._staticRequest('PUT', url, params, headers)
            .then(({ data, options }) => {
                let klass = `${options.apiVersion} / ${className}`;
                let json = data[klass];

                this.refreshFrom(json, options);

                return this;
            });
    }
}
