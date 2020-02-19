import assert from "assert";
import * as Binary from "../..";

const expectedTypes = [
    {name: "f32", byteLength: 4, components: 1},
    {name: "vec3<s32>", byteLength: 12, components: 3},
    {name: "mat4<u16>", byteLength: 32, components: 16},
];

describe("BinaryTypes", function () {
    for (let expectedType of expectedTypes) {
        it(`should contain valid (${expectedType.name}) type`, function () {
            const actualType = Binary.types.getTypeByName(expectedType.name);
            assert.strictEqual(actualType.name, expectedType.name);
            assert.strictEqual(actualType.byteLength, expectedType.byteLength);
            assert.strictEqual(actualType.components, expectedType.components);
        });
    }

    for (let expectedType of expectedTypes) {
        it(`resolve types by name (${expectedType.name})`, function () {
            const actualType = Binary.types.resolve(expectedType.name);
            assert.strictEqual(actualType.name, expectedType.name);
            assert.strictEqual(actualType.byteLength, expectedType.byteLength);
            assert.strictEqual(actualType.components, expectedType.components);
        });
    }
});
