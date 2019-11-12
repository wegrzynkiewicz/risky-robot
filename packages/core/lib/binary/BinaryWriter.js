export default class BinaryWriter extends BinaryAccess{

    constructor() {
        const buffer = BinaryBuffer.allocUnsafe(4096);
        super(buffer);
    }

    getBinaryBuffer() {
        const outputBinaryBuffer = BinaryBuffer.allocUnsafe(this.offset);
        this.buffer.copy(outputBinaryBuffer, 0, 0, this.offset);
        this.offset = 0;
        return outputBinaryBuffer;
    }
}
