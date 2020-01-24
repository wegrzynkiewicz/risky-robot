export default class VAO {

    constructor({view, name, program, vaoLayout, buffers}) {
        this.view = view;
        this.openGLVAOPointer = view.openGL.createVertexArray();
        this.vaoLayout = vaoLayout;
        this.buffers = buffers;

        this.link(program);

        if (process.env.INSPECTOR_METADATA_ENABLED && false) {
            attachVAOInspectorData.call({openGLVAOPointer, shader, name, vertexLayout, buffers});
        }
    }

    link(program) {
        const {openGL} = this.view;

        this.bind();
        for (let buffer of this.buffers) {
            buffer.bind();
            for (let attributeLayout of buffer.bufferLayout.getAttributeLayouts()) {
                const attributeLocationPointer = program.attributeLocations[attributeLayout.name];
                if (attributeLocationPointer < 0 || attributeLocationPointer === undefined) {
                    continue;
                }
                attributeLayout.bindAttributeLocationPointer(openGL, attributeLocationPointer);
                openGL.enableVertexAttribArray(attributeLocationPointer);
            }
            buffer.unbind();
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
