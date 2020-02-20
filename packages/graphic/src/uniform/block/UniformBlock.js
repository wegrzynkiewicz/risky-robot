export default class UniformBlock {

    constructor({name, view, program, uniformBlockLayout, uniformBuffer}) {
        this.name = name;
        this.view = view;
        this.program = program;
        this.uniformBlockLayout = uniformBlockLayout;
        this.uniformBuffer = uniformBuffer;

        this.link();
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
