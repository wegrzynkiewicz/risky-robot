export default class ArrayBufferLayout {

    constructor({byteLength}) {
        this.byteLength = byteLength;
        this.attributeBatchLayoutSet = new Set();
    }

    createArrayBufferByDataView() {
        const buffer = new ArrayBuffer(this.bufferLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
