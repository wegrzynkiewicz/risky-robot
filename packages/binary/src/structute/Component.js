import * as Binary from "../binary";
import ComponentAccessor from "../access/ComponentAccessor";

export default class Component {

    constructor({name, type, count}) {
        this.name = name;
        this.count = count === undefined ? 1 : count;
        this.type = Binary.types.resolve(type);
        this.byteLength = this.calculateByteLength();
    }

    get isScalar() {
        return false;
    }

    get isGeneric() {
        return false;
    }

    get isStructure() {
        return false;
    }

    calculateByteLength() {
        return this.type.byteLength * this.count;
    }

    createAccessor({dataView, byteOffset, byteStride}) {
        const {count, type} = this;
        return new ComponentAccessor({
            dataView,
            count,
            type,
            byteOffset,
            byteStride,
        });
    }
}
