import { FedaPayObject, Currency } from '..';
export declare function stripApiVersion(key: any, opts: any): any;
export declare function arrayToFedaPayObject(array: any, opts: any): any[] | FedaPayObject;
export declare function objectToFedaPayObject(attrs: any, opts: any, className: string): Currency[];
export declare function convertToFedaPayObject(resp: any, opts: any): FedaPayObject;
export declare function isList(array: any): boolean;
