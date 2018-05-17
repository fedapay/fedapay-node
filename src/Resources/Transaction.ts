import { Resource } from './Resource';
import { arrayToFedaPayObject } from './Utils';

export class Transaction extends Resource{
    generateToken(params = [], headers = []) : any {
        let url = `${this.instanceUrl()}/token`;
        let response, opts = Resource.staticRequest('post', url, params, headers);

        return arrayToFedaPayObject(response, opts);
    }
}