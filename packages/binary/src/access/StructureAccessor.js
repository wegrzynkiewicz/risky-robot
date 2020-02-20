export default class StructureAccessor {

    constructor({dataView, structure, byteOffset}) {
        this.dataView = dataView;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteLength = 0;
        this.createComponentAccessors(structure);
    }

    createComponentAccessors(structure) {
        let byteLength = 0;
        let byteOffset = this.byteOffset;
        for (const component of structure.components) {
            const componentAccessor = component.createAccessor({
                dataView: this.dataView,
                byteOffset,
            });
            byteOffset += component.byteLength;
            this[component.name] = componentAccessor;
        }

        this.byteLength = byteLength;
    }
}
