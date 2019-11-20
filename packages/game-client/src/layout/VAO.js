export default class VAO {

    constructor(vaoLayout) {
        this.vaoLayout = vaoLayout;
        this.vaoPointer = null;
    }

    use(openGL) {
        openGL.bindVertexArray(this.vaoPointer);
    }

    initialize({openGL, shader, glBufferPointers}) {
        this.vaoPointer = openGL.createVertexArray();
        openGL.bindVertexArray(this.vaoPointer);
        this.bind(openGL, shader, glBufferPointers);
        openGL.bindVertexArray(null);

        return this.vaoPointer;
    }

    bind(openGL, shader, glBufferPointers) {
        const bufferLength = glBufferPointers.length;
        if (bufferLength !== this.vaoLayout.buffers.length) {
            throw new Error("Invalid number of passed openGL buffers");
        }

        for (let bufferIndex = 0; bufferIndex < bufferLength; bufferIndex++) {
            const glBufferPointer = glBufferPointers[bufferIndex];
            const bufferLayout = this.vaoLayout.buffers[bufferIndex];
            this.bindBuffer(openGL, shader, glBufferPointer, bufferLayout);
        }
    }

    bindBuffer(openGL, shader, glBufferPointer, bufferLayout) {
        const vaoAllocation = bufferLayout.createVAOAllocation(this.vaoLayout);

        openGL.bindBuffer(bufferLayout.glBufferType, glBufferPointer);

        for (let attributeLayout of bufferLayout.attributes) {

            const pointer = shader.attributes[attributeLayout.name];
            if (pointer < 0 || pointer === undefined) {
                continue;
            }
            const {stride, offset} = vaoAllocation.getAttributeAllocationByName(attributeLayout.name);

            if (attributeLayout.type.glType === openGL.FLOAT || attributeLayout.normalize) {
                openGL.vertexAttribPointer(
                    pointer,
                    attributeLayout.type.components,
                    attributeLayout.type.glType,
                    attributeLayout.normalize,
                    stride,
                    offset
                );
            } else {
                openGL.vertexAttribIPointer(
                    pointer,
                    attributeLayout.type.components,
                    attributeLayout.type.glType,
                    stride,
                    offset
                );
            }
            openGL.enableVertexAttribArray(pointer);

            openGL.vertexAttribDivisor(
                pointer,
                attributeLayout.divisor
            );
        }
    }
}
