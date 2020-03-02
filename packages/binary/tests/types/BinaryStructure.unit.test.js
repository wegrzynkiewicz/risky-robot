import assert from 'assert';
import * as Binary from '../..';

describe('BinaryStructure', function () {

    it('should create simple structure', function () {
        const structure = Binary.Structure.compose({
            name: 'data',
            components: [
                {name: 'matrix', type: 'mat3<u32>'},
                {name: 'vector', type: 'vec2<u32>'},
                {name: 'scalar', type: 'u32'},
            ],
        });

        const dataView = structure.createDataView();
        const accessor = structure.createAccessor({dataView});
        assert.strictEqual(dataView.byteLength, 36 + 8 + 4);
        assert.strictEqual(accessor.fields['matrix'].byteLength, 36);
        assert.strictEqual(accessor.fields['vector'].byteLength, 8);
        assert.strictEqual(accessor.fields['scalar'].byteLength, 4);

        accessor.fields['scalar'].write(0x11111111);
        assert.strictEqual(dataView.getUint32(44, true), 0x11111111);

        const typedArray = accessor.fields['vector'].type.createTypedArray(1).fill(0x2);
        accessor.fields['vector'].write(typedArray);
        assert.strictEqual(dataView.getUint32(36, true), 0x2);
        assert.strictEqual(dataView.getUint32(40, true), 0x2);
    });

    it('should create nested structure', function () {

        const triangleStructure = Binary.Structure.compose({
            name: 'Triangle',
            components: [
                {name: 'position', type: 'vec3<u32>', count: 2},
                {name: 'normal', type: 'vec3<f32>', count: 2},
            ],
        });

        const lightStructure = Binary.Structure.compose({
            name: 'Light',
            components: [
                {name: 'position', type: 'vec3<f32>'},
                {name: 'color', type: 'vec3<f32>'},
                {name: 'triangle', type: triangleStructure, count: 2},
            ],
        });

        const structure = Binary.Structure.compose({
            name: 'Block',
            components: [
                {name: 'ambient', type: 'vec3<f32>'},
                {name: 'light', type: lightStructure, count: 2},
            ],
        });

        const triangleStructureByteLength = triangleStructure.byteLength;
        assert.strictEqual(triangleStructureByteLength, 12 * 2 + 12 * 2);

        const lightStructureByteLength = lightStructure.byteLength;
        assert.strictEqual(lightStructureByteLength, triangleStructureByteLength * 2 + 12 + 12);

        const structureByteLength = structure.byteLength;
        assert.strictEqual(structureByteLength, lightStructureByteLength * 2 + 12);

        const dataView = structure.createDataView();
        const accessor = structure.createAccessor({dataView});
        assert.strictEqual(dataView.byteLength, structureByteLength);

        accessor.fields['light'].items[1].fields['triangle'].items[1].fields['position'].writeElement(0, [1,2,3]);
        assert.strictEqual(dataView.getInt32(204, true), 1);
        assert.strictEqual(dataView.getInt32(208, true), 2);
        assert.strictEqual(dataView.getInt32(212, true), 3);
    });
});
