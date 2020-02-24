import * as Binary from "../binary";

export default class Component {

    constructor({byteOffset, byteStride, count, name, type}) {
        this.type = Binary.types.resolve(type);
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? this.type.byteLength : byteStride;
        this.count = count === undefined ? 1 : count;
        this.name = name;
    }

    get byteLength() {
        return this.type.byteLength * this.count;
    }

    createAccessor({dataView, count, byteOffset, byteStride}) {
        if (this.count === 1) {
            return this.type.createAccessor({
                dataView,
                byteOffset: byteOffset ? byteOffset : this.byteOffset,
            });
        } else {
            return this.type.createListAccessor({
                dataView,
                count: count ? count : this.count,
                byteOffset: byteOffset ? byteOffset : this.byteOffset,
                byteStride: byteStride ? byteStride : this.byteStride,
            });
        }
    }
}
