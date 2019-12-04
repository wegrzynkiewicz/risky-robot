import assert from "assert";

const spaceRegex = new RegExp("[^01]", "g");
const chunkRegex = new RegExp(".{1,8}", "g");

export default function assertBit(actual, expected) {
    const bitArray = new Uint8Array(actual);
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
