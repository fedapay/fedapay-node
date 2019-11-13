import { FedaPayObject } from '../FedaPayObject';
import { arrayToFedaPayObject } from '../Util';

export class DeleteOperation<T extends FedaPayObject> {
    /**
     * Send delete resource request
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    protected _delete(headers: any): Promise<T> {
        let url = this.instanceUrl();
        return Resource._staticRequest('delete', url, [], headers)
            .then(({ data, options }) => {
                return this;
            });
    }
}
