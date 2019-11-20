import Core from "robo24-core";

export default class VAOAttributeLayout {

    constructor({name, type, normalize, divisor}) {
        this.name = name;
        const typeConstructor = Core.binaryTypeRegistry.getTypeByName(type);
        if (!typeConstructor.prototype.glTypeName) {
            throw new Error(`Cannot use type (${type}) in vertex attribute`);
        }
        this.type = new typeConstructor();
        this.normalize = normalize === undefined ? false : normalize;
        this.divisor = divisor === undefined ? 0 : divisor;
    }

    getByteLength(verticesCount, verticesPerPrimitive) {
        if (this.divisor === 0) {
            return this.type.byteLength * verticesCount;
        }

        const divider = verticesPerPrimitive * this.divisor;

        return this.type.byteLength * (verticesCount / divider);
    }
};
