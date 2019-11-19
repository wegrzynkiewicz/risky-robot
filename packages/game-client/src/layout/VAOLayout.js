import VAOAttributeLayout from "./VAOAttributeLayout";
import VAOBufferLayout from "./VAOBufferLayout";

const availableTypes = [];

export default class VAOLayout {

    constructor(options) {
        Object.assign(this, options);
        this.attributes.map(attribute => ({
            normalize: false,
            ...attribute
        });
        this.calculateSize();
        this.triangle = [];
        this.offset = 0;
    }

    calculateSize() {
        let offset = 0;
        this.singleVertexByteSize = 0;

        for (let attribute of this.attributes) {
            attribute.byteSize = (attribute.components * types[attribute.type].byteSize);
            attribute.offset = offset;
            offset += attribute.byteSize;
            this.singleVertexByteSize += attribute.byteSize;
        }

        for (let attribute of this.attributes) {
            attribute.stride = this.singleVertexByteSize;
        }

        this.byteSize = this.vertices * this.singleVertexByteSize;
    }

    bind(shader, buffer, gl) {
        for (let attribute of this.attributes) {
            const pointer = shader.attributes[attribute.name];
            if (pointer < 0) {
                continue;
            }
            const components = attribute.components;
            const type = gl.FLOAT;
            const normalize = attribute.normalize;
            const stride = attribute.stride;
            const offset = attribute.offset;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(pointer, components, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }
    }
}

VAOLayout.Buffer = VAOBufferLayout;
VAOLayout.Attribute = VAOAttributeLayout;
