export default class BitDataView {

    constructor(dataView) {
        this.dataView = dataView;
    }

    set(width, offset, value) {
        const number = parseInt(value, 10);

        const bitOffsetStart = offset;
        const bitOffsetEnd = bitOffsetStart + width;
        const byteOffsetStart = Math.floor(bitOffsetStart / 8);
        const byteOffsetEnd = Math.floor(bitOffsetEnd / 8);
        const byteLength = byteOffsetEnd - byteOffsetStart;
    }
}
