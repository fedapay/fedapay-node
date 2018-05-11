let pluralize = require('pluralize');

export abstract class Inflector {
    static pluralize(word: string) {
        return pluralize(word);
    }
}