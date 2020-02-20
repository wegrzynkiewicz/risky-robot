import * as Binary from "../binary";
import ComponentAccessor from "../access/ComponentAccessor";

export default class Component {

    constructor({name, type, count}) {
        this.name = name;
        this.count = count === undefined ? 1 : count;
        this.type = Binary.types.resolve(type);
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

    get byteLength() {
        return this.type.byteLength;
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
