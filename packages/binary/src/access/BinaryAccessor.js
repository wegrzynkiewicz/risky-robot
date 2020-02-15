export default class BinaryAccessor {

    constructor({count, dataView, type, byteOffset, byteStride}) {
        this.type = type;
        this.count = count === undefined ? Infinity : count;
        this.dataView = dataView;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? type.byteLength : byteStride;
    }

    calculateOffset(index) {
        return this.byteOffset + (this.byteStride * index);
    }

    write(index, source) {
        const offset = this.calculateOffset(index);
        this.type.write(this.dataView, offset, source);
    }

    read(index, destination) {
        const offset = this.calculateOffset(index);
        return this.type.read(this.dataView, offset, destination);
    }
}
