import Component from "./Component";

export default class List extends Component {

    constructor({count, byteStride, ...options}) {
        super(options);
        this.count = count;
        this.byteStride = byteStride === undefined ? this.type.byteLength: byteStride;
    }

    get byteLength() {
        return this.type.byteLength * this.count;
    }

    createAccessor({dataView, byteOffset}) {
        const {type, byteStride, count} = this;
        return type.createListAccessor({
            dataView,
            count,
            byteOffset,
            byteStride
        });
    }
}
