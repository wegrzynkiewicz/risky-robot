import VAO from "./VAO";

export default class VAOCreator {

    constructor(openGL) {
        this.openGL = openGL;
    }

    createVAO({shader, vaoAllocation, buffers}) {
        const openGLVAOPointer = this.openGL.createVertexArray();
        const vao = new VAO({
            openGLVAOPointer,
            vaoAllocation
        });

        if (process.env.INSPECTOR_METADATA) {
            openGLVAOPointer.__SPECTOR_Metadata = {
                vaoAllocation: this.vaoAllocation,
                name: "cubeVerticesColorBuffer"
            };
        }

        this.openGL.bindVertexArray(openGLVAOPointer);

        for (let [bufferName, openGLBufferPointer] of Object.entries(buffers)) {
            const vaoBufferAllocation = vaoAllocation.getVAOBufferAllocationByName(bufferName);
            this.openGL.bindBuffer(vaoBufferAllocation.vaoBufferLayout.glBufferType, openGLBufferPointer);

            for (let vaoAttributeAllocation of vaoBufferAllocation.getVAOAttributeAllocations()) {
                const vaoAttributeLayout = vaoAttributeAllocation.vaoAttributeLayout;
                const attributeName = vaoAttributeLayout.name;
                const attributeLocationPointer = shader.attributes[attributeName];
                
                if (attributeLocationPointer < 0 || attributeLocationPointer === undefined) {
                    continue;
                }
                
                const attributeAllocation = vaoBufferAllocation.getAttributeAllocationByName(attributeName);
                const {stride, offset} = attributeAllocation;

                if (vaoAttributeLayout.type.glType === this.openGL.FLOAT || vaoAttributeLayout.normalize) {
                    this.openGL.vertexAttribPointer(
                        attributeLocationPointer,
                        vaoAttributeLayout.type.components,
                        vaoAttributeLayout.type.glType,
                        vaoAttributeLayout.normalize,
                        stride,
                        offset
                    );
                } else {
                    this.openGL.vertexAttribIPointer(
                        attributeLocationPointer,
                        vaoAttributeLayout.type.components,
                        vaoAttributeLayout.type.glType,
                        stride,
                        offset
                    );
                }
                this.openGL.enableVertexAttribArray(attributeLocationPointer);

                this.openGL.vertexAttribDivisor(
                    attributeLocationPointer,
                    vaoAttributeLayout.divisor
                );
            }
        }

        this.openGL.bindVertexArray(null);

        return vao;
    }
}
