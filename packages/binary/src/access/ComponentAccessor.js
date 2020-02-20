import * as Binary from "../binary";
import StructureAccessor from "./StructureAccessor";

export default class ComponentAccessor {

    constructor({count, dataView, type, byteOffset, byteStride}) {
        this.type = Binary.types.resolve(type);
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

    write(index, sourceTypedArray, sourceByteOffset = 0) {
        const destinationByteOffset = this.calculateOffset(index);
        this.type.write(this.dataView, destinationByteOffset, sourceTypedArray, sourceByteOffset);
    }

    read(index, destinationTypedArray, destinationByteOffset = 0) {
        const sourceByteOffset = this.calculateOffset(index);
        return this.type.read(this.dataView, sourceByteOffset, destinationTypedArray, destinationByteOffset);
    }

    item(index) {
        const byteOffset = this.calculateOffset(index);
        const structureAccessor = new StructureAccessor({
            dataView,
            structure: this.type, // TODO: refactor
            byteOffset,
        });
        return structureAccessor;
    }

    copyFromAccessor(sourceAccessor) {
        const {byteStride, type, count} = sourceAccessor;
        const isSourceCompact = byteStride === type.byteLength;
        const isDestinationCompact = this.byteStride === this.type.byteLength;

        if (isSourceCompact && isDestinationCompact) {
            const destinationTypedArray = this.getFullTypedArray();
            const sourceTypedArray = sourceAccessor.getFullTypedArray();
            destinationTypedArray.set(sourceTypedArray);
            console.log(destinationTypedArray);
        } else if (isDestinationCompact) {
            const destinationTypedArray = this.getFullTypedArray();
            for (let i = 0; i < count; i++) {
                const typedArray = sourceAccessor.getTypedArray(i);
                destinationTypedArray.set(i, typedArray);
            }
        } else {
            for (let i = 0; i < count; i++) {
                const typedArray = sourceAccessor.getTypedArray(i);
                this.write(i, typedArray);
            }
        }
    }

    getFullTypedArray() {
        const {type, count, dataView, byteOffset} = this;

        if (count === Infinity) {
            throw new Error("Cannot get full typed array then infinity accessor.");
        }

        if (this.byteStride !== type.byteLength) {
            throw new Error("Cannot get full typed array then byteStride is not equal byteLength.");
        }

        const elementsCount = count * type.components;
        const typedArray = new type.arrayTypeConstructor(
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
        const elementsCount = type.components;
        const typedArray = new type.arrayTypeConstructor(
            arrayBuffer,
            byteOffset,
            elementsCount
        );

        return typedArray;
    }
}
