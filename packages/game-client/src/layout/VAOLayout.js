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

            gl.bindBuffer(bufferLayout.type, glBufferPointer);

            for (let attribute of bufferLayout.attributes) {

                const pointer = shader.attributes[attribute.name];
                if (pointer < 0) {
                    continue;
                }
                const {stride, offset} = vaoAllocation.getAttributeAllocation(attribute.name);

                gl.enableVertexAttribArray(pointer);

                if (attribute.type.glType === gl.FLOAT || attribute.normalize) {
                    gl.vertexAttribPointer(
                        pointer,
                        attribute.components,
                        attribute.glType,
                        attribute.normalize,
                        stride,
                        offset
                    );
                } else {
                    gl.vertexAttribIPointer(
                        pointer,
                        attribute.components,
                        attribute.glType,
                        stride,
                        offset
                    );
                }

                gl.vertexAttribDivisor(
                    pointer,
                    attribute.divisor
                );
            }
        }
        gl.bindVertexArray(null);

        return vao;
    }
}

VAOLayout.Buffer = VAOBufferLayout;
VAOLayout.Attribute = VAOAttributeLayout;
