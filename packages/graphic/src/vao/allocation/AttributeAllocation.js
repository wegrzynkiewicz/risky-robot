export default class AttributeAllocation{

    constructor({name, type, divisor, normalize, byteStride, byteOffset}) {
        this.name = name;
        this.type = type;
        this.divisor = divisor;
        this.normalize = normalize;
        this.byteStride = byteStride;
        this.byteOffset = byteOffset;
    }
}
