export default class AttributeBatchAllocation {
    constructor({byteOffset}) {
        this.byteOffset = byteOffset;
        this.attributeAllocationMap = new Map();
    }
}
