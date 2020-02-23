export default class UniformBindingPoint {

    constructor({uniformBuffer, byteOffset, byteLength}) {
        this.uniformBlocks = new Set();
        this.uniformBuffer = uniformBuffer;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteLength = byteLength;
        this.bindingIndex = null;
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
