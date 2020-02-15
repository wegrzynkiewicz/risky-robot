const primitivesType = {
    [WebGL2RenderingContext["POINTS"]]: {
        calculateElementsCount: vertices => vertices,
    },
    [WebGL2RenderingContext["TRIANGLES"]]: {
        calculateElementsCount: vertices => vertices / 3,
    },
};

export default class Allocation {

    constructor({openGLPrimitiveType, verticesCount}) {

        if (openGLPrimitiveType === undefined) {
            throw new Error("Invalid  allocation primitive type.");
        }

        this.openGLPrimitiveType = openGLPrimitiveType;

        this.verticesCount = parseInt(verticesCount);
        if (isNaN(this.verticesCount)) {
            throw new Error("Invalid  allocation primitive type.");
        }
        this.elementsCount = primitivesType[openGLPrimitiveType].calculateElementsCount(this.verticesCount);
    }
}
