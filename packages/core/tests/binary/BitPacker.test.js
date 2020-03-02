import BitPacker from '../../src/binary/BitPacker';
import assert from 'assert';

const spaceRegex = new RegExp('[^01]', 'g');
const chunkRegex = new RegExp('.{1,8}', 'g');

function assertBit(actual, expected) {
    const bitArray = new Uint8Array(actual);
    const actualMaskBytes = [];
    for (let i = 0; i < bitArray.length; i++) {
        const bitByteRepresentation = bitArray[i].toString(2).padStart(8, '0');
        actualMaskBytes.push(bitByteRepresentation);
    }
    const actualMask = actualMaskBytes.join(' ');
    const expectedCleanBits = expected.replace(spaceRegex, '');
    const exceptedMask = expectedCleanBits.match(chunkRegex).join(' ');

    assert.strictEqual(actualMask, exceptedMask);
}

describe('BitPacker', function () {
    it('should write bit from buffer', function () {
        const arrayBuffer = new ArrayBuffer(6);
        const dataView = new DataView(arrayBuffer);
        const bitPacker = new BitPacker(dataView);

        bitPacker.pack(4, 0b1011);
        bitPacker.pack(4, 0b1101);

        bitPacker.pack(1, 0b1);
        bitPacker.pack(1, 0b0);
        bitPacker.pack(1, 0b1);
        bitPacker.pack(1, 0b0);
        bitPacker.pack(1, 0b1);
        bitPacker.pack(1, 0b0);
        bitPacker.pack(2, 0b11);

        bitPacker.pack(5, 0b11111);
        bitPacker.flush();

        bitPacker.pack(6, 0b111111);
        bitPacker.flush();

        bitPacker.pack(12, 0b101010111011);
        bitPacker.pack(4, 0b0011);
        bitPacker.flush();

        assertBit(arrayBuffer, '10111101 10101011 11111000 11111100 10101011 10110011');
    });
});
