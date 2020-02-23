export default class Primitive {

    constructor({view, openGLPrimitiveType, verticesCount, program, vao, material}) {
        this.vao = vao;
        this.view = view;
        this.program = program;
        this.material = material;
        this.verticesCount = verticesCount;
        this.openGLPrimitiveType = openGLPrimitiveType;
    }

    render(system) {
        this.program.use();
        this.view.uniformBlockManager.checkUniformBlockBinding(this.program);

        // TODO: prepare material
        this.vao.render(system);
    }
}
