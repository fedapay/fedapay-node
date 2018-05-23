import { FedaPayObject } from './FedaPayObject';
import { Requestor } from './Requestor';
export declare class Resource extends FedaPayObject {
    protected static requestor: Requestor;
    static setRequestor(req: Requestor): void;
    static getRequestor(req: Requestor): Requestor;
    static className(): string;
    static classPath(): string;
    static resourcePath(id: number | string): string;
    instanceUrl(): any;
    protected static _validateParams(params?: any): void;
    protected static _staticRequest(method: any, url: any, params?: any, headers?: any): Promise<{
        data: any;
        options: {
            'apiVersion': string;
            'environment': string;
        };
    }>;
    protected static _retrieve(id: any, headers?: any): Promise<FedaPayObject>;
    protected static _all(params?: any, headers?: any): Promise<FedaPayObject | FedaPayObject[]>;
    protected static _create(params: any, headers: any): Promise<FedaPayObject>;
    protected static _update(id: any, params: any, headers: any): Promise<FedaPayObject>;
    protected _delete(headers: any): Promise<FedaPayObject>;
    protected _save(headers: any): Promise<FedaPayObject>;
}
