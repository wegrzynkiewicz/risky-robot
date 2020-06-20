import Core from 'risky-robot-core';

export default class VAOAttributeLayout {

    constructor({name, type, normalize, divisor}) {
        this.name = name;
        const typeConstructor = Core.binaryTypeRegistry.getTypeByName(type);
        if (!typeConstructor.prototype.glTypeName) {
            throw new Error(`Cannot use type (${type}) in vertex attribute`);
        }
        this.type = typeConstructor.prototype;
        this.normalize = normalize === undefined ? false : normalize;
        this.divisor = divisor === undefined ? 0 : divisor;
    }

    getByteLength({primitiveCount, verticesCount}) {
        if (this.divisor === 0) {
            return this.type.byteLength * verticesCount;
        }

        return Math.ceil(this.type.byteLength * (primitiveCount / this.divisor));
    }

    write(dataView, offset, value) {
        this.type.write(dataView, offset, value);
    }

    read(dataView, offset) {
        return this.type.read(dataView, offset);
    }
}
