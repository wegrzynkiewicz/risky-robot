import Core from "robo24-core";
import VAOAttributeLayout from "./VAOAttributeLayout";
import VAOBufferLayout from "./VAOBufferLayout";

const primitivesType = {
    "triangle": {
        glType: Core.WebGLRenderingContext["TRIANGLES"],
        getVerticesCount: elements => elements * 3,
    },
};

export default class VAOLayout {

    constructor({elements, primitive, buffers}) {
        this.elements = elements;
        this.primitive = primitive;
        this.glDrawType = primitivesType[this.primitive].glType;
        this.buffers = buffers;
    }

    getElementsCount() {
        return this.elements;
    }

    getVerticesCount() {
        return primitivesType[this.primitive].getVerticesCount(this.elements);
    }

    createVAO({shader, buffers, openGL}) {
        const gl = openGL;

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const bufferLength = buffers.length;
        if (bufferLength !== this.buffers.length) {
            throw new Error("Invalid number of passed openGL buffers");
        }

        for (let bufferIndex = 0; bufferIndex < bufferLength; bufferIndex++) {

            const glBufferPointer = buffers[bufferIndex];
            const bufferLayout = this.buffers[bufferIndex];
            const vaoAllocation = bufferLayout.createVAOAllocation(this);

            gl.bindBuffer(bufferLayout.glBufferType, glBufferPointer);

            for (let attributeLayout of bufferLayout.attributes) {

                const pointer = shader.attributes[attributeLayout.name];
                if (pointer < 0) {
                    continue;
                }
                const {stride, offset} = vaoAllocation.getAttributeAllocationByName(attributeLayout.name);

                gl.enableVertexAttribArray(pointer);
                console.log(attributeLayout);
                if (attributeLayout.type.glType === gl.FLOAT || attributeLayout.normalize) {
                    gl.vertexAttribPointer(
                        pointer,
                        attributeLayout.type.components,
                        attributeLayout.type.glType,
                        attributeLayout.normalize,
                        stride,
                        offset
                    );
                } else {
                    gl.vertexAttribIPointer(
                        pointer,
                        attributeLayout.type.components,
                        attributeLayout.type.glType,
                        stride,
                        offset
                    );
                }

                gl.vertexAttribDivisor(
                    pointer,
                    attributeLayout.divisor
                );
            }
        }
        gl.bindVertexArray(null);

        return vao;
    }
}

VAOLayout.Buffer = VAOBufferLayout;
VAOLayout.Attribute = VAOAttributeLayout;
