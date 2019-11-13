import { FedaPayObject } from '../FedaPayObject';
export declare class DeleteOperation<T extends FedaPayObject> {
    /**
     * Send delete resource request
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    protected _delete(headers: any): Promise<T>;
}
