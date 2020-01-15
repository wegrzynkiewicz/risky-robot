const primitivesType = {
    "triangle": {
        glType: WebGLRenderingContext["TRIANGLES"],
        glTypeName: "TRIANGLES",
        calculateVerticesCount: elements => elements * 3,
    },
};

export default class Allocation {

    constructor({primitive, elementsCount}) {
        const {glType, glTypeName, calculateVerticesCount} = primitivesType[primitive];

        if (glTypeName === undefined) {
            throw new Error("Invalid  allocation primitive type.");
        }

        this.glType = glType;
        this.glTypeName = glTypeName;
        this.primitive = primitive;
        this.elementsCount = elementsCount;
        this.verticesCount = calculateVerticesCount(elementsCount);

        this.bufferAllocationsByName = Object.create(null);
        this.bufferAllocations = [];
    }

    getBufferAllocations() {
        return this.bufferAllocations;
    }

    addBufferAllocation(bufferAllocation) {
        this.bufferAllocations.push(bufferAllocation);
        this.bufferAllocationsByName[bufferAllocation.bufferLayout.name] = bufferAllocation;
    }

    getBufferAllocationByName(bufferAllocationName) {
        const bufferAllocation = this.bufferAllocationsByName[bufferAllocationName];
        if (bufferAllocation === undefined) {
            throw new Error(`Not found  Buffer Allocation named ${bufferAllocationName}`);
        }
        return bufferAllocation;
    }
}
