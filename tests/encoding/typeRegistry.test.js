import {assert} from "chai";
import typeRegistry from "../../lib/binary/typeRegistry";

const types = [
    {name: "f32", byteSize: 4},
    {name: "vec3<s32>", byteSize: 12},
    {name: "mat4<u16>", byteSize: 32},
];

describe("typeRegistry", function () {
    for (let expectedType of types) {
        it(`should contain valid (${expectedType.name}) type`, function () {
            const actualType = typeRegistry.getTypeByName(expectedType.name);
            assert.strictEqual(actualType.prototype["typeName"], expectedType.name);
            assert.strictEqual(actualType.prototype.getByteSize(), expectedType.byteSize);
        });
    }
});
