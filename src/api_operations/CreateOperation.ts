import { FedaPayObject } from '../FedaPayObject';
import { arrayToFedaPayObject } from '../Util';

export class CreateOperation<T extends FedaPayObject> {
    /**
     * Send create resource request
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    public static create(
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
}
