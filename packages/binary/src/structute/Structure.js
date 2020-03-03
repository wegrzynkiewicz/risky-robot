import Component from './Component';
import StructureAccessor from '../access/StructureAccessor';
import StructureListAccessor from '../access/StructureListAccessor';

const mapComponents = data => new Component(data);

function calculateByteLength(components) {
    let byteLength = 0;
    for (const component of components) {
        byteLength += component.byteLength;
    }
    return byteLength;
}

export default class Structure {

    constructor({name, components}) {
        this.name = name;
        this.axisLength = 1;
        this.byteLength = calculateByteLength(components);
        this.components = [...components];
    }

    write(dataView, destinationByteOffset, sourceTypedArray, sourceByteOffset = 0) {
        // TODO: structure write
        destinationTypedArray.set(sourceTypedArray, sourceByteOffset);
    };

    read(dataView, sourceByteOffset, destinationTypedArray, destinationByteOffset = 0) {
        // TODO: structure read
        destinationTypedArray.set(sourceTypedArray, destinationByteOffset);
        return destinationTypedArray;
    };

    createAccessor({dataView, byteOffset}) {
        return new StructureAccessor({
            dataView,
            structure: this,
            byteOffset,
        });
    }

    createListAccessor({dataView, count, byteOffset, byteStride}) {
        return new StructureListAccessor({
            dataView,
            count,
            structure: this,
            byteOffset,
            byteStride,
        });
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.byteLength);
        const dataView = new DataView(buffer);

        return dataView;
    }

    createTypedArray() {
        throw new Error('Cannot create typed array on structure.')
    };

    static compose({name, components}) {
        const structure = new Structure({
            name,
            components: components.map(mapComponents),
        });
        return structure;
    }
}
