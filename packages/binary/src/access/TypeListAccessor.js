import * as Binary from '../binary';

export default class TypeListAccessor {

    constructor({count, dataView, type, byteOffset, byteStride}) {
        this.type = Binary.types.resolve(type);
        this.count = count;
        this.dataView = dataView;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? type.byteLength : byteStride;
    }

    get byteLength() {
        return this.type.byteLength * this.count;
    }

    calculateOffset(index) {
        if (index > this.count) {
            throw new Error('Range error.');
        }
        return this.byteOffset + (this.byteStride * index);
    }

    writeElement(index, sourceTypedArray, sourceByteOffset = 0) {
        const destinationByteOffset = this.calculateOffset(index);
        this.type.write(this.dataView, destinationByteOffset, sourceTypedArray, sourceByteOffset);
    }

    readElement(index, destinationTypedArray, destinationByteOffset = 0) {
        const sourceByteOffset = this.calculateOffset(index);
        return this.type.read(this.dataView, sourceByteOffset, destinationTypedArray, destinationByteOffset);
    }

    copyFromAccessor(sourceAccessor) {
        if (!(sourceAccessor instanceof TypeListAccessor)) {
            throw new Error('Cannot copy data from different types list accessor.');
        }

        const {byteStride, type, count} = sourceAccessor;
        const isSourceCompact = byteStride === type.byteLength;
        const isDestinationCompact = this.byteStride === this.type.byteLength;

        if (isSourceCompact && isDestinationCompact) {
            const destinationTypedArray = this.getFullTypedArray();
            const sourceTypedArray = sourceAccessor.getFullTypedArray();
            destinationTypedArray.set(sourceTypedArray);
        } else if (isDestinationCompact) {
            const destinationTypedArray = this.getFullTypedArray();
            for (let i = 0; i < count; i++) {
                const typedArray = sourceAccessor.getTypedArray(i);
                destinationTypedArray.set(i, typedArray);
            }
        } else {
            for (let i = 0; i < count; i++) {
                const typedArray = sourceAccessor.getTypedArray(i);
                this.writeElement(i, typedArray);
            }
        }
    }

    getFullTypedArray() {
        const {type, count, dataView, byteOffset} = this;

        if (count === Infinity) {
            throw new Error('Cannot get full typed array then infinity accessor.');
        }

        if (this.byteStride !== type.byteLength) {
            throw new Error('Cannot get full typed array then byteStride is not equal byteLength.');
        }

        const elementsCount = count * type.axisLength;
        const typedArray = new type.ArrayType(
            dataView.buffer,
            dataView.byteOffset + byteOffset,
            elementsCount
        );

        return typedArray;
    }

    getTypedArray(index) {
        const {type, dataView} = this;
        const offset = this.calculateOffset(index);
        const arrayBuffer = dataView.buffer;
        const byteOffset = dataView.byteOffset + offset;
        const elementsCount = type.axisLength;
        const typedArray = new type.ArrayType(
            arrayBuffer,
            byteOffset,
            elementsCount
        );

        return typedArray;
    }
}
