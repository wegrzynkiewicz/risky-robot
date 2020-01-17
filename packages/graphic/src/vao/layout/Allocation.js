const primitivesType = {
    "point": {
        glType: WebGLRenderingContext["POINTS"],
        glTypeName: "POINTS",
        calculateVerticesCount: elements => elements,
    },
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

        this.elementsCount = parseInt(elementsCount);
        if (isNaN(this.elementsCount)) {
            throw new Error("Invalid  allocation primitive type.");
        }

        this.glType = glType;
        this.glTypeName = glTypeName;
        this.primitive = primitive;
        this.verticesCount = calculateVerticesCount(elementsCount);
    }
}
