export default class StructureListAccessor {

    constructor({dataView, count, byteOffset, byteStride, structure}) {
        this.count = count;
        this.dataView = dataView;
        this.structure = structure;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? structure.byteLength : byteStride;
        this.items = [];
        this.createItemsAccessors(this);
    }

    get byteLength() {
        return this.structure.byteLength * this.count;
    }

    calculateOffset(index) {
        if (index > this.count) {
            throw new Error('Range error.');
        }
        return this.byteOffset + this.byteStride * index;
    }

    createItemsAccessors() {
        let {byteOffset} = this;
        const {count, dataView, structure} = this;
        for (let i = 0; i < count; i++) {
            this.items[i] = structure.createAccessor({
                byteOffset,
                dataView,
            });
            byteOffset += this.byteStride;
        }
    }

    writeElement(index, sourceTypedArray, sourceByteOffset = 0) {
        const destinationByteOffset = this.calculateOffset(index);
        this.type.write(this.dataView, destinationByteOffset, sourceTypedArray, sourceByteOffset);
    }

    readElement(index, destinationTypedArray, destinationByteOffset = 0) {
        const sourceByteOffset = this.calculateOffset(index);
        return this.type.read(this.dataView, sourceByteOffset, destinationTypedArray, destinationByteOffset);
    }

    getTypedArray(index) {
        const {type, dataView} = this;
        const offset = this.calculateOffset(index);
        const arrayBuffer = dataView.buffer;
        const byteOffset = dataView.byteOffset + offset;
        const elementsCount = type.components;
        const typedArray = new type.ArrayType(
            arrayBuffer,
            byteOffset,
            elementsCount,
        );

        return typedArray;
    }
}
