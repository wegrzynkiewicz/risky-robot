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

        this.bufferAllocationMap = new Map();
        this.attributeAllocationMap = new Map();
        this.accessorMap = new Map();
    }
}
