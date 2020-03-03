import * as Binary from 'robo24-binary';
import AttributeLayout from '../layout/AttributeLayout';

export default class AttributeBlueprint {

    constructor({name, type, location, normalize, divisor}) {
        this.name = name;
        this.type = Binary.types.resolve(type);
        if (!this.type.openGLTypeName) {
            throw new Error(`Cannot use type (${this.type.name}) in vertex attribute`);
        }
        this.location = location;
        this.normalize = normalize === undefined ? false : normalize;
        this.divisor = divisor === undefined ? 0 : divisor;
    }

    createAttributeAllocation({allocation, byteOffset, byteStride}) {
        const {type, name, location, normalize, divisor} = this;
        return new AttributeLayout({
            name,
            normalize,
            divisor,
            location,
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
}
