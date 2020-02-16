export default class Primitive {

    constructor({openGLPrimitiveType, verticesCount, program, vao, material}) {
        this.vao = vao;
        this.verticesCount = verticesCount;
        this.program = program;
        this.material = material;
        this.openGLPrimitiveType = openGLPrimitiveType;
    }
}
