export default class ElementBufferLayout {

    constructor({byteLength}) {
        this.byteLength = byteLength;
    }

    getIndexAccessor() {
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.bufferLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
