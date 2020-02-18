import {BinaryTypes} from "../binary";

export default class BinaryTypeAccessor {

    constructor({count, dataView, type, byteOffset, byteStride}) {
        this.type = BinaryTypes.resolve(type);
        this.count = count === undefined ? Infinity : count;
        this.dataView = dataView;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? type.byteLength : byteStride;
    }

    calculateOffset(index) {
        if (index > this.count) {
            throw new Error("Range error.");
        }
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

    getTypedArray(index) {
        const {type, dataView} = this;
        const offset = this.calculateOffset(index);
        const arrayBuffer = dataView.buffer;
        const byteOffset = dataView.byteOffset + offset;
        const elementsCount = type.components;
        const typedArray = new type.arrayType(arrayBuffer, byteOffset, elementsCount);

        return typedArray;
    }
}
