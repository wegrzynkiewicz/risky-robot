import BinaryTypes from "../types/BinaryTypes";
import BinaryTypeAccessor from "../access/BinaryTypeAccessor";

export default class BinaryComponent {

    constructor({name, type, count}) {
        this.name = name;
        this.count = count === undefined ? 1 : count;
        this.type = BinaryTypes.resolve(type);
    }

    createAccessor({dataView, byteOffset, byteStride}) {
        const {count, type} = this;
        return new BinaryTypeAccessor({
            dataView,
            count,
            type,
            byteOffset,
            byteStride,
        });
    }
}
