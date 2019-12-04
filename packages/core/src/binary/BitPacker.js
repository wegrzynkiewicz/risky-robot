export default class BitPacker {

    constructor(dataView) {
        this.dataView = dataView;
        this.dataViewOffset = 0;
        this.bufferBitOffset = 0;
        this.buffer = new Uint8Array(8);
    }

    pack(width, value) {
        for (let i = width - 1; i >= 0; i--) {
            const bit = (value >> i) & 0b1;
            this.buffer[this.bufferBitOffset++] = bit;
            if (this.bufferBitOffset === 8) {
                this.flush();
            }
        }
    }

    flush() {
        if (this.bufferBitOffset === 0) {
            return;
        }


        let bitMask = 0;
        for (let i = 0; i < this.bufferBitOffset; i++) {
            bitMask |= (this.buffer[i] << (7 - i));
        }

        this.dataView.setUint8(this.dataViewOffset++, bitMask);
        this.bufferBitOffset = 0;
    }
}
