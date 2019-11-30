export default class VAOBufferAllocation {

    constructor({vaoAllocation, vaoBufferLayout}) {
        this.vaoAllocation = vaoAllocation;
        this.vaoBufferLayout = vaoBufferLayout;
        this.vaoAttributeAllocations = Object.create(null);
    }

    addAttributeAllocation(vaoAttributeAllocation) {
        const {name} = vaoAttributeAllocation.vaoAttributeLayout;
        this.vaoAttributeAllocations[name] = vaoAttributeAllocation;
    }

    getVAOAttributeAllocations() {
        return Object.values(this.vaoAttributeAllocations);
    }

    getAttributeAllocationByName(name) {
        const vaoAttributeAllocation = this.vaoAttributeAllocations[name];
        if (vaoAttributeAllocation === undefined) {
            throw new Error(`Not found attribute's vaoAttributeAllocation named (${name})`);
        }
        return vaoAttributeAllocation;
    }

    getByteLength() {
        let count = 0;
        for (let vaoAttributeAllocation of Object.values(this.vaoAttributeAllocations)) {
            count += vaoAttributeAllocation.getByteLength();
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
