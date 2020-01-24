import VAO from "../../../game-client/src/layout/VAO";

export default class VAOCreator {

    constructor({view}) {
        this.view = view;
    }

    createVAO({name, shader, vertexLayout, buffers}) {
        const {openGL} = this.view;

        const openGLVAOPointer = openGL.createVertexArray();
        const vao = new VAO({openGL, openGLVAOPointer});

        vao.bind();

        for (let buffer of buffers) {
            buffer.bind();
            for (let attributeLayout of buffer.bufferLayout.getAttributeLayouts()) {
                try {
                    const attributeLocationPointer = shader.getAttributeLocationPointer(attributeLayout.name);
                    attributeLayout.bindAttributeLocationPointer(openGL);
                    openGL.enableVertexAttribArray(attributeLocationPointer);
                } catch (error) {
                    // nothing
                }
            }
            buffer.unbind();
        }

        if (process.env.INSPECTOR_METADATA_ENABLED && false) {
            attachVAOInspectorData.call({openGLVAOPointer, shader, name, vertexLayout, buffers});
        }

        vao.unbind();

        return vao;
    }

}

function attachVAOInspectorData() {
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

