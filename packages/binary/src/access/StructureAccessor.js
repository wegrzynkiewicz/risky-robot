import {TypeRepository} from "../binary";

export default class StructureAccessor {

    constructor({count, dataView, structure, byteOffset, byteStride}) {
        this.count = count === undefined ? 1 : count;
        this.dataView = dataView;
        this.byteOffset = byteOffset === undefined ? 0 : byteOffset;
        this.byteStride = byteStride === undefined ? structure.byteLength : byteStride;
    }
}
