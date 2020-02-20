import Component from "./Component";
import StructureAccessor from "../access/StructureAccessor";

const mapComponents = component => new Component(component);


export default class Structure {

    constructor({name, count, components}) {
        this.name = name;
        this.count = count === undefined ? 1 : count;
        this.components = [...components];
        this.byteLength = this.calculateByteLength();
    }

    get isScalar() {
        return false;
    }

    get isGeneric() {
        return false;
    }

    get isStructure() {
        return true;
    }

    calculateByteLength() {
        let byteLength = 0;
        for (const component of this.components) {
            byteLength += component.byteLength;
        }
        return byteLength;
    }

    createAccessor({dataView, byteOffset = undefined, byteStride = undefined}) {
        const structureAccessor = new StructureAccessor({
            dataView,
            count: this.count,
            structure: this,
            byteOffset,
            byteStride,
        });
        return structureAccessor;
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.byteLength);
        const dataView = new DataView(buffer);

        return dataView;
    }

    static compose({name, components}) {
        const structure = new Structure({
            name,
            components: components.map(mapComponents)
        });
        return structure;
    }
}
