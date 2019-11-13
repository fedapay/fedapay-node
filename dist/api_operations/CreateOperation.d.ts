import { FedaPayObject } from '../FedaPayObject';
export declare class CreateOperation<T extends FedaPayObject> {
    /**
     * Send create resource request
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    static create(params: any, headers: any): Promise<FedaPayObject>;
}
