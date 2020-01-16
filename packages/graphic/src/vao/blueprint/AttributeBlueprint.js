import Binary from "robo24-binary";
import AttributeLayout from "../layout/AttributeLayout";

export default class AttributeBlueprint {

    constructor({name, type, normalize, divisor}) {
        this.name = name;
        this.type = Binary.types.getTypeByName(type);
        if (!this.type.glTypeName) {
            throw new Error(`Cannot use type (${type}) in vertex attribute`);
        }
        this.normalize = normalize === undefined ? false : normalize;
        this.divisor = divisor === undefined ? 0 : divisor;
    }

    createAttributeAllocation({allocation, byteOffset, byteStride}) {
        const {type, name, normalize, divisor} = this;
        return new AttributeLayout({
            name,
            normalize,
            divisor,
            type,
            byteOffset,
            byteStride,
        });
    }

    calculateTotalByteLength({verticesCount, elementsCount}) {
        const {byteLength} = this.type;
        if (this.divisor === 0) {
            return byteLength * verticesCount;
        }
        return Math.ceil(byteLength * (elementsCount / this.divisor));
    }
};
