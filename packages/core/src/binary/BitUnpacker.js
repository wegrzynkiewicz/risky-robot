export default class BitUnpacker {

    constructor(dataView) {
        this.dataView = dataView;
        this.dataViewOffset = 0;
        this.bufferBitOffset = 8;
        this.buffer = new Uint8Array(8);
    }

    unpack(width) {
        let value = 0;
        const shifts = width - 1;
        for (let i = 0; i < width; i++) {
            if (this.bufferBitOffset === 8) {
                this.load();
            }
            const bit = this.buffer[this.bufferBitOffset];
            value |= bit << shifts - i;
            this.bufferBitOffset++;
        }
        return value;
    }

    load() {
        const loadedBitsCount = 8;
        const shifts = loadedBitsCount - 1;
        const number = this.dataView.getUint8(this.dataViewOffset);
        for (let i = 0; i < loadedBitsCount; i++) {
            const bit = (number >> (shifts - i)) & 1;
            this.buffer[i] = bit;
        }
        this.bufferBitOffset = 0;
        this.dataViewOffset++;
    }
}
