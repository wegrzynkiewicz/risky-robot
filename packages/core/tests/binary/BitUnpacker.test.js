import assert from 'assert';
import BitUnpacker from '../../src/binary/BitUnpacker';

const spaceRegex = new RegExp('[^01]', 'g');
const chunkRegex = new RegExp('.{1,8}', 'g');

const binary = str => parseInt(str.replace(spaceRegex, ''), 2);

function assertBinary(actual, expected) {
    const number = parseInt(actual, 10);
    const bits = number.toString(2);
    const numberBytes = Math.ceil(bits.length / 8);
    const actualMaskBytes = number.toString(2).padStart(8 * numberBytes, '0');
    const actualMask = actualMaskBytes.match(chunkRegex).join(' ');
    const expectedCleanBits = expected.replace(spaceRegex, '');
    const exceptedMask = expectedCleanBits.match(chunkRegex).join(' ');

    assert.strictEqual(actualMask, exceptedMask);
}

describe('BitUnpacker', function () {
    it('should read bit from buffer', function () {
        const arrayBuffer = new ArrayBuffer(8);
        const dataView = new DataView(arrayBuffer);
        dataView.setUint32(0, binary('1101|1011| 1|0|1|1011|1 11101111 11000001'));
        dataView.setUint32(4, binary('11110000 11|101010 10101010 10101|111'));

        const bitUnpacker = new BitUnpacker(dataView);

        assertBinary(bitUnpacker.unpack(4), '00001101');
        assertBinary(bitUnpacker.unpack(4), '00001011');
        assertBinary(bitUnpacker.unpack(1), '00000001');
        assertBinary(bitUnpacker.unpack(1), '00000000');
        assertBinary(bitUnpacker.unpack(1), '00000001');
        assertBinary(bitUnpacker.unpack(4), '00001011');
        assertBinary(bitUnpacker.unpack(27), '00000111 10111111 00000111 11000011');
        assertBinary(bitUnpacker.unpack(19), '00000101 01010101 01010101');
        assertBinary(bitUnpacker.unpack(3), '00000111');
    });
});
