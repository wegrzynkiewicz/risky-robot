export default class VAO {

    constructor({view, program, layout, name, attributeBuffers, indicesBuffer}) {
        this.name = name;
        this.view = view;
        this.byteOffset = 0;
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
            this.view.openGL.drawElements(
                this.layout.allocation.openGLPrimitiveType,
                this.layout.allocation.verticesCount,
                this.indicesBuffer.bufferLayout.type.openGLType,
                this.byteOffset,
            );
        } else {
            this.view.openGL.drawArrays(
                this.layout.allocation.openGLPrimitiveType,
                this.byteOffset,
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
        const {openGL} = this.view;

        this.bind();
        for (let attributeBuffer of this.attributeBuffers) {
            attributeBuffer.bind();
            for (let attributeLayout of attributeBuffer.bufferLayout.getAttributeLayouts()) {
                const attributeLocationPointer = this.program.attributeLocations[attributeLayout.name];
                if (attributeLocationPointer < 0 || attributeLocationPointer === undefined) {
                    continue;
                }
                attributeLayout.bindAttributeLocationPointer(openGL, attributeLocationPointer);
                openGL.enableVertexAttribArray(attributeLocationPointer);
            }
        }

        if (this.indicesBuffer) {
            this.indicesBuffer.bind();
        }
        this.unbind();
    }
}
