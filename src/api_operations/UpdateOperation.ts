import { FedaPayObject } from '../FedaPayObject';
import { arrayToFedaPayObject } from '../Util';

export class UpdateOperation<T extends FedaPayObject> {
    /**
     * Send create resource request
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    public static update(
        id,
        params: any,
        headers: any
    ): Promise<T> {
        this._validateParams(params);
        let url = this.resourcePath(id);
        let className = this.className();

        return this._staticRequest('put', url, params, headers)
            .then(({ data, options }) => {
                let object = <T>arrayToFedaPayObject(data, options);

                return <T>object[className];
            });
    }
}
