const primitivesType = {
    [WebGL2RenderingContext["POINTS"]]: {
        calculatePrimitiveCount: vertices => vertices,
    },
    [WebGL2RenderingContext["TRIANGLES"]]: {
        calculatePrimitiveCount: vertices => vertices / 3,
    },
};

export default class Allocation {

    constructor({openGLPrimitiveType, verticesCount, indicesCount}) {

        this.openGLPrimitiveType = openGLPrimitiveType;
        if (this.openGLPrimitiveType === undefined) {
            throw new Error("Invalid allocation primitive type.");
        }

        this.verticesCount = parseInt(verticesCount);
        if (isNaN(this.verticesCount)) {
            throw new Error("Invalid allocation vertices count.");
        }

        this.indicesCount = parseInt(indicesCount);
        if (isNaN(this.verticesCount)) {
            throw new Error("Invalid allocation indices count.");
        }

        this.primitiveCount = primitivesType[openGLPrimitiveType].calculatePrimitiveCount(this.verticesCount);
    }
}
