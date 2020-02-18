import {BinaryTypes} from "robo24-binary";
import AttributeLayout from "../layout/AttributeLayout";

export default class AttributeBlueprint {

    constructor({name, type, normalize, divisor}) {
        this.name = name;
        this.type = BinaryTypes.getTypeByName(type);
        if (!this.type.openGLTypeName) {
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

    calculateTotalByteLength(allocation) {
        const {verticesCount, primitiveCount} = allocation;
        const {byteLength} = this.type;
        if (this.divisor === 0) {
            return byteLength * verticesCount;
        }
        return Math.ceil(byteLength * (primitiveCount / this.divisor));
    }
};
