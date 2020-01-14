import assert from "assert";
import BinaryTypes from "../../src/types/BinaryTypes.js";

const types = [
    {name: "f32", byteLength: 4},
    {name: "vec3<s32>", byteLength: 12},
    {name: "mat4<u16>", byteLength: 32},
];

describe("binaryTypeRegistry", function () {
    const binaryTypes = new BinaryTypes();
    console.log(binaryTypes.types['mat4<s32>'].prototype);
    for (let expectedType of types) {
        it(`should contain valid (${expectedType.name}) type`, function () {
            const actualType = binaryTypes.getTypeByName(expectedType.name);
            assert.strictEqual(actualType.prototype["typeName"], expectedType.name);
            assert.strictEqual(actualType.prototype.getByteLength(), expectedType.byteLength);
        });
    }
});
