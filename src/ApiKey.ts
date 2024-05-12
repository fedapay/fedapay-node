import { Resource } from './Resource';

/**
 * Class ApiKey
 *
 * @property int $id
 * @property string $public_key
 * @property string $private_key
 * @property string $created_at
 * @property string $updated_at
 */
export class ApiKey extends Resource {
    protected static ressourceName = 'api_key';
}
