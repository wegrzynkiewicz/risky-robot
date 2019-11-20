export default class VAOBufferBuilder {

    constructor({vaoAllocation, buffer}) {
        this.vertives = vertices;
        this.vaoAllocation = vaoAllocation;
        this.counters = Object.create(null);
        for (let {attribute} of this.vaoAllocation.getAttributesAllocations()) {
            this.counters[attribute.name] = 0;
        }
    }

    put({attribute, stride, offset}) {
        this.allocations[attribute.name] = {attribute, stride, offset};
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

    getByteLength(verticesPerPrimitive) {
        let count = 0;
        for (let {attribute} of Object.values(this.allocations)) {
            count += attribute.getByteLength(this.vertives, verticesPerPrimitive);
        }
        return count;
    }
}
