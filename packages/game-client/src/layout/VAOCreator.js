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

        if (process.env.INSPECTOR_METADATA_ENABLED) {
            const allocation = {
                elements: vaoAllocation.elements,
                vertices: vaoAllocation.vertices,
                glDrawType: vaoAllocation.glDrawType,
                glDrawTypeName: vaoAllocation.glDrawTypeName,
            };

            const bufferAllocations = {};
            for (let vaoBufferAllocation of vaoAllocation.getVAOBufferAllocations()) {
                const name = vaoBufferAllocation.vaoBufferLayout.name;
                const label = `Buffer Allocation (${name})`;

                const attributeAllocations = {};
                for (let vaoAttributeAllocation of vaoBufferAllocation.getVAOAttributeAllocations()) {
                    const vaoAttributeLayout = vaoAttributeAllocation.vaoAttributeLayout;
                    const name = vaoAttributeLayout.name;
                    const label = `Attribute Allocation (${name})`;

                    attributeAllocations[label] = {
                        name,
                        byteLength: vaoAttributeAllocation.getByteLength(),
                        stride: vaoAttributeAllocation.stride,
                        offset: vaoAttributeAllocation.offset,
                        divisor: vaoAttributeLayout.divisor,
                        normalize: vaoAttributeLayout.normalize,
                        typeName: vaoAttributeLayout.type.typeName,
                    };
                }

                bufferAllocations[label] = {
                    name,
                    byteLength: vaoBufferAllocation.getByteLength(),
                    ...attributeAllocations,
                };
            }

            openGLVAOPointer.__SPECTOR_Metadata = {
                "Allocation": allocation,
                ...bufferAllocations
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
