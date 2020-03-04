export default class UniformBindingPoint {

    constructor({byteLength, byteOffset, uniformBuffer}) {
        this.bindingIndex = null;
        this.byteLength = byteLength;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.uniformBlocks = new Set();
        this.uniformBuffer = uniformBuffer;
    }

    bufferBinding() {
        if (this.byteOffset === 0) {
            this.uniformBuffer.bindBufferRange(this);
        } else {
            this.uniformBuffer.bindBufferBase(this);
        }
    }

    clearBindingIndex() {
        this.bindingIndex = null;
        for (const uniformBlock of this.uniformBlocks.values()) {
            uniformBlock.bindingIndex = null;
        }
    }
}
