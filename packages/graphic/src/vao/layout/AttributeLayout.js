import Binary from "robo24-binary";

export default class AttributeLayout {

    constructor({name, type, normalize, divisor}) {
        this.name = name;
        this.type = Binary.getTypeByName(type);
        if (!this.type.glTypeName) {
            throw new Error(`Cannot use type (${type}) in vertex attribute`);
        }
        this.normalize = normalize === undefined ? false : normalize;
        this.divisor = divisor === undefined ? 0 : divisor;
    }

    getByteLength({primitivesCount, verticesCount}) {
        if (this.divisor === 0) {
            return this.type.byteLength * verticesCount;
        }
        return Math.ceil(this.type.byteLength * (primitivesCount / this.divisor));
    }
};
