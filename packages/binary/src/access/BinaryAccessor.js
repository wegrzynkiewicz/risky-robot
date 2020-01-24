export default class BinaryAccessor {

    constructor({type, byteOffset, byteStride}) {
        this.type = type;
        this.byteOffset = byteOffset;
        this.byteStride = byteStride;
    }

    calculateOffset(index) {
        return this.byteOffset + (this.byteStride * index);
    }

    write(dataView, index, source) {
        const offset = this.calculateOffset(index);
        this.type.write(dataView, offset, source);
    }

    read(dataView, index, destination) {
        const offset = this.calculateOffset(index);
        return this.type.read(dataView, offset, destination);
    }
}
