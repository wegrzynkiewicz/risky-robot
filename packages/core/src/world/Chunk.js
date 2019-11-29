/**
 * @property {Number} width
 * @property {Number} height
 * @property {Number} depth
 * @property {Number} elements
 * @property {DataView} dataView
 * @property {ArrayBuffer} arrayBuffer
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
}
