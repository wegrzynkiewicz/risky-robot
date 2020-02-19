import * as Binary from "../binary";
import ComponentAccessor from "../access/ComponentAccessor";

export default class Component {

    constructor({name, type, count}) {
        this.name = name;
        this.count = count === undefined ? 1 : count;
        this.type = Binary.types.resolve(type);
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
