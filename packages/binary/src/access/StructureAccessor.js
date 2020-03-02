export default class StructureAccessor {

    constructor({dataView, structure, byteOffset}) {
        this.dataView = dataView;
        this.structure = structure;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.fields = Object.create(null);
        this.createComponentAccessors();
    }

    get byteLength() {
        return this.structure.byteLength;
    }

    createComponentAccessors() {
        let {byteOffset} = this;
        for (const component of this.structure.components) {
            const componentAccessor = component.createAccessor({
                byteOffset,
                dataView: this.dataView,
            });
            byteOffset += component.byteLength;
            this.fields[component.name] = componentAccessor;
        }
    }

    write(sourceTypedArray, sourceByteOffset = 0) {
        this.type.write(this.dataView, this.byteOffset, sourceTypedArray, sourceByteOffset);
    }

    read(destinationTypedArray, destinationByteOffset = 0) {
        return this.type.read(this.dataView, this.byteOffset, destinationTypedArray, destinationByteOffset);
    }
}
