const chunkDataBufferLength = 65536;

export default class ChunkData {

    constructor() {
        this.arrayBuffer = new ArrayBuffer(chunkDataBufferLength);
    }

    dispose() {
        this.arrayBuffer = null;
    }

    static fromArrayBuffer(arrayBuffer) {
        const chunkData = new ChunkData();
        const writer = new Uint8Array(chunkData.arrayBuffer);
        const reader = new Uint8Array(arrayBuffer);

        writer.set(reader);

        return chunkData;
    }
}
