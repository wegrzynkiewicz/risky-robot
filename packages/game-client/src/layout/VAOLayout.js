import VAOAttributeLayout from "./VAOAttributeLayout";
import VAOBufferLayout from "./VAOBufferLayout";

export default class VAOLayout {

    constructor({vertices, buffers}) {
        this.vertices = vertices;
        this.buffers = buffers;
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
            const vaoAllocation = bufferLayout.createVAOAllocation(this.vertices);

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
