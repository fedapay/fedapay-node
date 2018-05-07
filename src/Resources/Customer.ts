import { Resource } from './Resource';

export class Customer extends Resource {
    static retrieve(id: any, headers = []) {}
    static all(params = [], headers = []) {}
    static create(params = [], headers = []) {}
    static update(id: any, params = [], headers = []) {}
    static save(headers = []) {}
    static delete(headers = []) {}
}