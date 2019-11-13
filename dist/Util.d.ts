import { FedaPayObject } from './FedaPayObject';
/**
 * Convert response to FedaPayObject
 * @param {any} resp
 * @param {any} opts
 */
export declare function convertToFedaPayObject(resp: any, opts: any): FedaPayObject;
/**
 * Convert array response to FedaPayObject
 * @param {any} array
 * @param {any} opts
 */
export declare function arrayToFedaPayObject(array: any, opts: any): FedaPayObject | FedaPayObject[];
/**
 * Strip api version from key
 * @param {any} key
 * @param {any} opts
 */
export declare function stripApiVersion(key: any, opts: any): string;
/**
 * Check a date falue
 * @param mixed $date
 * @return mixed
 */
export declare function toDateString(date: any): string | number;
/**
   * Secure compare, from https://github.com/freewil/scmp
   */
export declare function secureCompare(a: any, b: any): boolean;
