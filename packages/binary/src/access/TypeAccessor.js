import * as Binary from '../binary';

export default class TypeAccessor {

    constructor({dataView, type, byteOffset}) {
        this.type = Binary.types.resolve(type);
        this.dataView = dataView;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
    }

    get byteLength() {
        return this.type.byteLength;
    }

    write(sourceTypedArray, sourceByteOffset = 0) {
        this.type.write(this.dataView, this.byteOffset, sourceTypedArray, sourceByteOffset);
    }

    read(destinationTypedArray, destinationByteOffset = 0) {
        return this.type.read(this.dataView, this.byteOffset, destinationTypedArray, destinationByteOffset);
    }

    copyFromAccessor(sourceAccessor) {
        if (!(sourceAccessor instanceof TypeAccessor)) {
            throw new Error('Cannot copy data from different types list accessor.');
        }
        const destinationTypedArray = this.getTypedArray();
        const typedArray = sourceAccessor.getTypedArray();
        destinationTypedArray.set(typedArray);
    }

    getTypedArray() {
        const {type, byteOffset, dataView} = this;
        const typedArray = new type.ArrayType(
            dataView.buffer,
            dataView.byteOffset + byteOffset,
            type.components,
        );

        return typedArray;
    }
}
