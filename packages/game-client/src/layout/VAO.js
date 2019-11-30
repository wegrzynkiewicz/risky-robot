export default class VAO {

    constructor(vaoLayout) {
        this.vaoLayout = vaoLayout;
        this.vaoPointer = null;
    }

    use(openGL) {
        openGL.bindVertexArray(this.vaoPointer);
    }

    initialize({openGL, shader, glBufferPointers, buffers}) {
        this.vaoPointer = openGL.createVertexArray();
        if (process.env.INSPECTOR_METADATA) {
            this.vaoPointer.__SPECTOR_Metadata = {
                vao: this.vaoLayout,
                name: "cubeVerticesColorBuffer"
            };
        }
        openGL.bindVertexArray(this.vaoPointer);
        this.bind(openGL, shader, glBufferPointers, buffers);
        openGL.bindVertexArray(null);

        return this.vaoPointer;
    }

    bind(openGL, shader, glBufferPointers, buffers) {
        const bufferLength = glBufferPointers.length;
        if (bufferLength !== buffers.length) {
            throw new Error("Invalid number of passed openGL buffers");
        }

        for (let bufferIndex = 0; bufferIndex < bufferLength; bufferIndex++) {
            const glBufferPointer = glBufferPointers[bufferIndex];
            const bufferLayout = buffers[bufferIndex];
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
            const attributeAllocation = vaoAllocation.getAttributeAllocationByName(attributeLayout.name);
            const {stride, offset} = attributeAllocation;

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
