import * as Binary from '../..';
import assert from 'assert';

const expectedTypes = [
    {
        axisLength: 1,
        byteLength: 4,
        name: 'f32',
    },
    {
        axisLength: 3,
        byteLength: 12,
        name: 'vec3<s32>',
    },
    {
        axisLength: 16,
        byteLength: 32,
        name: 'mat4<u16>',
    },
];

describe('BinaryTypes', () => {
    for (const expectedType of expectedTypes) {
        it(`should contain valid (${expectedType.name}) type`, () => {
            const actualType = Binary.types.getTypeByName(expectedType.name);
            assert.strictEqual(actualType.name, expectedType.name);
            assert.strictEqual(actualType.byteLength, expectedType.byteLength);
            assert.strictEqual(actualType.axisLength, expectedType.axisLength);
        });
    }

    for (const expectedType of expectedTypes) {
        it(`resolve types by name (${expectedType.name})`, () => {
            const actualType = Binary.types.resolve(expectedType.name);
            assert.strictEqual(actualType.name, expectedType.name);
            assert.strictEqual(actualType.byteLength, expectedType.byteLength);
            assert.strictEqual(actualType.axisLength, expectedType.axisLength);
        });
    }
});
