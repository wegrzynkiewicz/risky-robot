import * as Binary from 'risky-robot-binary';
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

    createAttributeAllocation({byteOffset, byteStride}) {
        const {type, name, location, normalize, divisor} = this;
        return new AttributeLayout({
            byteOffset,
            byteStride,
            divisor,
            location,
            name,
            normalize,
            type,
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
