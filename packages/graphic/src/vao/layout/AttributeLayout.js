import Binary from "robo24-binary";
import AttributeAllocation from "../allocation/AttributeAllocation";

export default class AttributeLayout {

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

        const binaryAccessor = new Binary.Accessor({
            type,
            byteOffset,
            byteStride
        });
        allocation.accessorMap.set(name, binaryAccessor);

        const attributeAllocation = new AttributeAllocation({
            name,
            normalize,
            divisor,
            type,
            byteOffset,
            byteStride,
        });
        allocation.attributeAllocationMap.set(name, attributeAllocation);

        return attributeAllocation;
    }

    calculateTotalByteLength({verticesCount, elementsCount}) {
        const {byteLength} = this.type;
        if (this.divisor === 0) {
            return byteLength * verticesCount;
        }
        return Math.ceil(byteLength * (elementsCount / this.divisor));
    }
};
