/**
 * @property {Number} width
 * @property {Number} height
 * @property {Number} depth
 * @property {Number} elements
 * @property {DataView} dataView
 * @property {Function} encodeIndex
 * @property {Function} decodeIndex
 * @property {ArrayBufferBlueprint} arrayBuffer
 */
export default class Chunk {

    constructor() {
        this.dataView = null;
        this.arrayBuffer = null;
    }

    allocateBuffer() {
        this.arrayBuffer = new ArrayBuffer(this.elements);
        this.dataView = new DataView(this.arrayBuffer);
    }

    releaseBuffer() {
        if (this.arrayBuffer !== null) {
            this.arrayBuffer = null;
            this.dataView = null;
        }
    }

    getElementByAxis(x, y, z) {
        if (this.arrayBuffer === null) {
            return 0;
        }

        const index = this.encodeIndex(x, y, z);
        // TODO: make dynamic read data
        const value = this.dataView.getInt8(index);

        return value;
    }
}
