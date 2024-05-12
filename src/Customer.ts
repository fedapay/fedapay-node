import { FedaPayObject } from './FedaPayObject';
import { Resource } from './Resource';

/**
 * Class Customer
 *
 * @property int $id
 * @property string $firstname
 * @property string $lastname
 * @property string $email
 * @property string $phone
 * @property string $created_at
 * @property string $updated_at
 */
export class Customer extends Resource {
    protected static ressourceName = 'customer';

    /**
     * @param {string|number} id The customer id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    static retrieve(id, params = {}, headers = {}): Promise<Customer> {
        return <Promise<Customer>> this._retrieve(id, params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    static all(params = {}, headers = {}): Promise<FedaPayObject> {
        return <Promise<FedaPayObject>> this._all(params, headers);
    }

    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>}
     */
    static create(params = {}, headers = {}): Promise<Customer> {
        return <Promise<Customer>> this._create(params, headers);
    }

    /**
     * @param {string|number} id The ID of the customer to update.
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>}
     */
    static update(id, params = {}, headers = {}): Promise<Customer> {
        return <Promise<Customer>> this._update(id, params, headers);
    }

    /**
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>} The saved customer.
     */
    save(headers = {}): Promise<Customer> {
        return <Promise<Customer>> this._save(headers);
    }

    /**
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>} Customer The deleted customer.
     */
    delete(headers = {}): Promise<Customer> {
        return <Promise<Customer>> this._delete(headers);
    }
}
