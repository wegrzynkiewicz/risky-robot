import AbstractType from './AbstractType';
import Component from '../structute/Component';
import Structure from '../structute/Structure';

export default class TypeRepository {

    constructor() {
        this.types = Object.create(null);
    }

    registerType(type) {
        this.types[type.name] = type;
    }

    resolve(type) {
        if (typeof type === 'string') {
            return this.getTypeByName(type);
        }

        if (type instanceof AbstractType) {
            return type;
        }

        if (type instanceof Structure) {
            return type;
        }

        if (type instanceof Component) {
            return type;
        }

        throw new Error('Cannot resolve type.');
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
}
