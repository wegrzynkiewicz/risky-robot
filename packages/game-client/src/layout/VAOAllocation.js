export default class VAOAllocation {

    constructor({elements, vaoLayout, vertices, glDrawType, glDrawTypeName}) {
        this.elements = elements;
        this.vaoLayout = vaoLayout;
        this.vertices = vertices;
        this.glDrawType = glDrawType;
        this.glDrawTypeName = glDrawTypeName;
        this.bufferAllocations = Object.create(null);
    }

    getVAOBufferAllocations() {
        return Object.values(this.bufferAllocations);
    }

    addVAOBufferAllocation(vaoBufferAllocation) {
        this.bufferAllocations[vaoBufferAllocation.vaoBufferLayout.name] = vaoBufferAllocation;
    }

    getVAOBufferAllocationByName(vaoBufferAllocationName) {
        const vaoBufferAllocation = this.bufferAllocations[vaoBufferAllocationName];
        if (vaoBufferAllocation === undefined) {
            throw new Error(`Not found VAO Buffer Allocation named ${vaoBufferAllocationName}`);
        }
        return vaoBufferAllocation;
    }
}
