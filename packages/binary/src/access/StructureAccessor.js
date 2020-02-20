export default class StructureAccessor {

    constructor({count, dataView, structure, byteOffset, byteStride}) {
        this.count = count === undefined ? 1 : count;
        this.dataView = dataView;
        this.structure = structure;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? structure.byteLength : byteStride;
        this.byteLength = 0;
        this.componentAccessors = [];
        this.createComponentAccessors();
    }

    createComponentAccessors() {
        let byteLength = 0;
        let byteOffset = this.byteOffset;
        for (const component of this.structure.components) {
            const componentAccessor = component.createAccessor({
                dataView: this.dataView,
                byteOffset,
            });
            byteOffset += component.byteLength;
            this.componentAccessors.push(componentAccessor);
            this[component.name] = componentAccessor;
        }

        this.byteLength = byteLength;
    }
}
