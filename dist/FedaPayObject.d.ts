/**
 * Class FedaPayObject
 */
export declare class FedaPayObject {
    [key: string]: any;
    constructor(id?: any, opts?: any);
    /**
     * Refresh object from values
     * @param {any} values
     * @param {any} opts
     */
    refreshFrom(values: any, opts: any): void;
    /**
     * Serialize object
     * @returns {Object}
     */
    serializeParameters(): any;
}
