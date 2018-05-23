import { FedaPayObject } from './FedaPayObject';
export declare function convertToFedaPayObject(resp: any, opts: any): FedaPayObject;
export declare function arrayToFedaPayObject(array: any, opts: any): FedaPayObject | FedaPayObject[];
export declare function stripApiVersion(key: any, opts: any): string;
