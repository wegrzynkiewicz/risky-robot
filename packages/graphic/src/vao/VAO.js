export default class VAO {

    constructor({view, program, layout, name, attributeBuffers, indicesBuffer}) {
        this.name = name;
        this.view = view;
        this.offset = 0;
        this.layout = layout;
        this.program = program;
        this.openGLVAOPointer = view.openGL.createVertexArray();
        this.attributeBuffers = attributeBuffers;
        this.indicesBuffer = indicesBuffer;

        this.link();
    }

    render() {
        this.bind();
        if (this.indicesBuffer) {
            const {byteLength, openGLType} = this.indicesBuffer.bufferLayout.type;
            this.view.openGL.drawElements(
                this.layout.allocation.openGLPrimitiveType,
                this.layout.allocation.indicesCount,
                openGLType,
                this.offset * byteLength,
            );
        } else {
            this.view.openGL.drawArrays(
                this.layout.allocation.openGLPrimitiveType,
                this.offset,
                this.layout.allocation.verticesCount,
            );
        }
    }

    bind() {
        this.view.stateMachine.bindVertexArray(this.openGLVAOPointer);
    }

    unbind() {
        this.view.stateMachine.bindVertexArray(null);
    }

    link() {
        this.bind();
        for (let attributeBuffer of this.attributeBuffers) {
            attributeBuffer.bind();
            for (let attributeLayout of attributeBuffer.bufferLayout.getAttributeLayouts()) {
                attributeLayout.bindAttributeLocation(this.view);
                this.view.openGL.enableVertexAttribArray(attributeLayout.location);
            }
        }

        if (this.indicesBuffer) {
            this.indicesBuffer.bind();
        }
        this.unbind();
    }
}
