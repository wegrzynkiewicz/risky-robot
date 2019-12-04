import assert from "assert";
import BitDataView from "../../src/binary/BitDataView";

const spaceRegex = new RegExp("[^01]", "g");
const chunkRegex = new RegExp(".{1,8}", "g");

function assertBit(actual, expected) {
    const bitArray = new Int8Array(actual);
    const actualMaskBytes = [];
    for (let i = 0; i < bitArray.length; i++) {
        const bitByteRepresentation = bitArray[i].toString(2).padStart(8, "0");
        actualMaskBytes.push(bitByteRepresentation);
    }
    const actualMask = actualMaskBytes.join(" ");
    const expectedCleanBits = expected.replace(spaceRegex, "");
    const exceptedMask = expectedCleanBits.match(chunkRegex).join(" ");

    assert.strictEqual(actualMask, exceptedMask);
}

describe("BitDataView", function () {
    it(`should read bit from buffer`, function () {
        const arrayBuffer = new ArrayBuffer(4);
        const dataView = new DataView(arrayBuffer);
        const bitDataView = new BitDataView(dataView);

        bitDataView.set(4, 7, 0b1111);
        assertBit(arrayBuffer, "01111000 00000000 00000000 00000000");
    });
});
