export default class VAOBufferAllocation {

    constructor() {
        this.attributeAllocations = [];
        this.attributeAllocationsByName = Object.create(null);
    }

    addAttributeAllocation(attributeAllocation) {
        this.attributeAllocations.push(attributeAllocation);
        this.attributeAllocationsByName[attributeAllocation.name] = attributeAllocation;
    }

    getVAOAttributeAllocations() {
        return this.attributeAllocations;
    }

    getAttributeAllocationByName(name) {
        const attributeAllocation = this.attributeAllocationsByName[name];
        if (attributeAllocation === undefined) {
            throw new Error(`Not found attribute's attributeAllocation named (${name})`);
        }
        return attributeAllocation;
    }

    calculateByteLength() {
        let count = 0;
        for (let attributeAllocation of this.attributeAllocations) {
            count += attributeAllocation.getByteLength();
        }
        return count;
    }

    createArrayBufferByDataView() {
        const bufferLength = this.getByteLength();
        const buffer = new ArrayBuffer(bufferLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
