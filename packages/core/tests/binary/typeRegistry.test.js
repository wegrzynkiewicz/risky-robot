import assert from 'assert';
import binaryTypeRegistry from '../../src/binary/binaryTypeRegistry';

const types = [
    {name: 'f32', byteLength: 4},
    {name: 'vec3<s32>', byteLength: 12},
    {name: 'mat4<u16>', byteLength: 32},
];

describe('binaryTypeRegistry', function () {
    for (let expectedType of types) {
        it(`should contain valid (${expectedType.name}) type`, function () {
            const actualType = binaryTypeRegistry.getTypeByName(expectedType.name);
            assert.strictEqual(actualType.prototype['typeName'], expectedType.name);
            assert.strictEqual(actualType.prototype.getByteLength(), expectedType.byteLength);
        });
    }
});
