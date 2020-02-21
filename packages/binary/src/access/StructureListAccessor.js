function createItemsAccessors() {
    let byteOffset = this.byteOffset;
    for (let i = 0; i < this.count; i++) {
        this.items[i] = this.structure.createAccessor({
            dataView: this.dataView,
            byteOffset,
        });
        byteOffset += this.byteStride;
    }
}

export default class StructureListAccessor {

    constructor({dataView, count, byteOffset, byteStride, structure}) {
        this.count = count;
        this.dataView = dataView;
        this.structure = structure;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? structure.byteLength : byteStride;
        this.items = [];
        createItemsAccessors.call(this);
    }

    get byteLength() {
        return this.structure.byteLength * this.count;
    }

    calculateOffset(index) {
        if (index > this.count) {
            throw new Error("Range error.");
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

    getTypedArray(index) {
        const {type, dataView} = this;
        const offset = this.calculateOffset(index);
        const arrayBuffer = dataView.buffer;
        const byteOffset = dataView.byteOffset + offset;
        const elementsCount = type.components;
        const typedArray = new type.arrayTypeConstructor(
            arrayBuffer,
            byteOffset,
            elementsCount
        );

        return typedArray;
    }
}
