const primitivesType = {
    "point": {
        openGLPrimitiveType: WebGLRenderingContext["POINTS"],
        openGLPrimitiveTypeName: "POINTS",
        calculateVerticesCount: elements => elements,
    },
    "triangle": {
        openGLPrimitiveType: WebGLRenderingContext["TRIANGLES"],
        openGLPrimitiveTypeName: "TRIANGLES",
        calculateVerticesCount: elements => elements * 3,
    },
};

export default class Allocation {

    constructor({primitive, elementsCount}) {
        const {openGLPrimitiveType, openGLPrimitiveTypeName, calculateVerticesCount} = primitivesType[primitive];

        if (openGLPrimitiveTypeName === undefined) {
            throw new Error("Invalid  allocation primitive type.");
        }

        this.elementsCount = parseInt(elementsCount);
        if (isNaN(this.elementsCount)) {
            throw new Error("Invalid  allocation primitive type.");
        }

        this.openGLPrimitiveType = openGLPrimitiveType;
        this.openGLPrimitiveTypeName = openGLPrimitiveTypeName;
        this.primitive = primitive;
        this.verticesCount = calculateVerticesCount(elementsCount);
    }
}
