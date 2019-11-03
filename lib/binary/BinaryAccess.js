export default class BinaryAccess {

    constructor(binaryBuffer) {
        this.buffer = binaryBuffer;
        this.offset = 0;
    }

    write(value, length, encoding) {
        if (length === undefined) {
            length = value.length;
        }
        this.buffer.write(value, this.offset, encoding);
        this.offset += length;
    }

    writeBigInt64BE(value) {
        this.buffer.writeBigInt64BE(value, this.offset);
        this.offset += 8;
    }

    writeBigUInt64BE(value) {
        this.buffer.writeBigUInt64BE(value, this.offset);
        this.offset += 8;
    }

    writeDoubleBE(value) {
        this.buffer.writeDoubleBE(value, this.offset);
        this.offset += 8;
    }

    writeFloatBE(value) {
        this.buffer.writeFloatBE(value, this.offset);
        this.offset += 4;
    }

    writeInt8(value) {
        this.buffer.writeInt8(value, this.offset);
        this.offset += 1;
    }

    writeInt16BE(value) {
        this.buffer.writeInt16BE(value, this.offset);
        this.offset += 2;
    }

    writeInt32BE(value) {
        this.buffer.writeInt32BE(value, this.offset);
        this.offset += 4;
    }

    writeUInt8(value) {
        this.buffer.writeUInt8(value, this.offset);
        this.offset += 1;
    }

    writeUInt16BE(value) {
        this.buffer.writeUInt16BE(value, this.offset);
        this.offset += 2;
    }

    writeUInt32BE(value) {
        this.buffer.writeUInt32BE(value, this.offset);
        this.offset += 4;
    }

    writeIntBE(value, length) {
        this.buffer.writeIntBE(value, this.offset, length);
        this.offset += length;
    }

    writeUIntBE(value, length) {
        this.buffer.writeUIntBE(value, this.offset, length);
        this.offset += length;
    }

    readBigInt64BE() {
        const data = this.buffer.readBigInt64BE(this.offset);
        this.offset += 8;
        return data;
    }

    readBigUInt64BE() {
        const data = this.buffer.readBigUInt64BE(this.offset);
        this.offset += 8;
        return data;
    }

    readDoubleBE() {
        const data = this.buffer.readDoubleBE(this.offset);
        this.offset += 8;
        return data;
    }

    readFloatBE() {
        const data = this.buffer.readFloatBE(this.offset);
        this.offset += 4;
        return data;
    }

    readInt8() {
        const data = this.buffer.readInt8(this.offset);
        this.offset += 1;
        return data;
    }

    readInt16BE() {
        const data = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return data;
    }

    readInt32BE() {
        const data = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return data;
    }

    readUInt8() {
        const data = this.buffer.readUInt8(this.offset);
        this.offset += 1;
        return data;
    }

    readUInt16BE() {
        const data = this.buffer.readUInt16BE(this.offset);
        this.offset += 2;
        return data;
    }

    readUInt32BE() {
        const data = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return data;
    }

    readIntBE(length) {
        const data = this.buffer.readIntBE(this.offset, length);
        this.offset += length;
        return data;
    }

    readUIntBE(length) {
        const data = this.buffer.readUIntBE(this.offset, length);
        this.offset += length;
        return data;
    }
}
