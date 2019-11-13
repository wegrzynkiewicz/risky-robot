import assert from "assert";
import typeRegistry from "../../src/binary/typeRegistry";

const types = [
    {name: "f32", byteLength: 4},
    {name: "vec3<s32>", byteLength: 12},
    {name: "mat4<u16>", byteLength: 32},
];

describe("typeRegistry", function () {
    for (let expectedType of types) {
        it(`should contain valid (${expectedType.name}) type`, function () {
            const actualType = typeRegistry.getTypeByName(expectedType.name);
            assert.strictEqual(actualType.prototype["typeName"], expectedType.name);
            assert.strictEqual(actualType.prototype.getByteLength(), expectedType.byteLength);
        });
    }
});
