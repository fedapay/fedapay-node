import { Resource } from './Resource';

/**
 * Class PhoneNumber
 *
 * @property int $id
 * @property string $number
 * @property string $country
 * @property string $created_at
 * @property string $updated_at
 *
 * @package FedaPay
 */
export class PhoneNumber extends Resource {
    protected static ressourceName = 'phone_number';
}
