import * as Binary from "../binary";
import TypeAccessor from "../access/TypeAccessor";
import TypeListAccessor from "../access/TypeListAccessor";

export default class Component {

    constructor({name, type}) {
        this.name = name;
        this.type = Binary.types.resolve(type);
    }

    get byteLength() {
        return this.type.byteLength;
    }

    createAccessor({dataView, byteOffset}) {
        return new TypeAccessor({
            dataView,
            type: this.type,
            byteOffset,
        });
    }

    createListAccessor({dataView, count, byteOffset, byteStride}) {
        return new TypeListAccessor({
            dataView,
            count,
            type: this,
            byteOffset,
            byteStride,
        });
    }
}
