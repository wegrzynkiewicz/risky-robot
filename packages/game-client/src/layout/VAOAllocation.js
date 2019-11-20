export default class VAOAllocation {

    constructor() {
        this.allocations = Object.create(null);
    }

    add(allocation) {
        this.allocations[allocation.attributeLayout.name] = allocation;
    }

    getAttributesAllocations() {
        return Object.values(this.allocations);
    }

    getAttributeAllocationByName(name) {
        const allocation = this.allocations[name];
        if (allocation === undefined) {
            throw new Error(`Not found attribute's allocation named (${name})`);
        }
        return allocation;
    }

    getByteLength() {
        let count = 0;
        for (let allocation of Object.values(this.allocations)) {
            count += allocation.getByteLength();
            console.log(allocation);
            console.log(allocation.getByteLength());
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
