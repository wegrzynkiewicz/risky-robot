export default class VAO {

    constructor({view, name, program, layout, attributeBuffers, indicesBuffer}) {
        this.view = view;
        this.layout = layout;
        this.openGLVAOPointer = view.openGL.createVertexArray();
        this.attributeBuffers = attributeBuffers;
        this.indicesBuffer = indicesBuffer;

        this.link(program);
    }

    link(program) {
        const {openGL} = this.view;

        this.bind();
        for (let attributeBuffer of this.attributeBuffers) {
            attributeBuffer.bind();
            for (let attributeLayout of attributeBuffer.bufferLayout.getAttributeLayouts()) {
                const attributeLocationPointer = program.attributeLocations[attributeLayout.name];
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

    bind() {
        this.view.stateMachine.bindVertexArray(this.openGLVAOPointer);
    }

    unbind() {
        this.view.stateMachine.bindVertexArray(null);
    }
}
