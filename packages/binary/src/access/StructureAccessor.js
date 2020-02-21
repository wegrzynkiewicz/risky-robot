function createComponentAccessors() {
    let byteOffset = this.byteOffset;
    for (const component of this.structure.components) {
        const componentAccessor = component.createAccessor({
            dataView: this.dataView,
            byteOffset,
        });
        byteOffset += component.byteLength;
        this.fields[component.name] = componentAccessor;
    }
}

export default class StructureAccessor {

    constructor({dataView, structure, byteOffset}) {
        this.dataView = dataView;
        this.structure = structure;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.fields = Object.create(null);
        createComponentAccessors.call(this);
    }

    get byteLength() {
        return this.structure.byteLength;
    }

    write(sourceTypedArray, sourceByteOffset = 0) {
        this.type.write(this.dataView, this.byteOffset, sourceTypedArray, sourceByteOffset);
    }

    read(destinationTypedArray, destinationByteOffset = 0) {
        return this.type.read(this.dataView, this.byteOffset, destinationTypedArray, destinationByteOffset);
    }
}
