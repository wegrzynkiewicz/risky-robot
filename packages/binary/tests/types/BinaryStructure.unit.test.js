import * as Binary from '../..';
import assert from 'assert';

describe('BinaryStructure', () => {

    it('should create simple structure', () => {
        const structure = new Binary.Structure({
            components: [
                new Binary.Component({
                    name: 'matrix',
                    type: 'mat3<u32>',
                }),
                new Binary.Component({
                    name: 'vector',
                    type: 'vec2<u32>',
                }),
                new Binary.Component({
                    name: 'scalar',
                    type: 'u32',
                }),
            ],
            name: 'data',
        });

        const dataView = structure.createDataView();
        const accessor = structure.createAccessor({dataView});
        assert.strictEqual(dataView.byteLength, 36 + 8 + 4);
        assert.strictEqual(accessor.fields.matrix.byteLength, 36);
        assert.strictEqual(accessor.fields.vector.byteLength, 8);
        assert.strictEqual(accessor.fields.scalar.byteLength, 4);

        accessor.fields.scalar.write(0x11111111);
        assert.strictEqual(dataView.getUint32(44, true), 0x11111111);

        const typedArray = accessor.fields.vector.type.createTypedArray(1).fill(0x2);
        accessor.fields.vector.write(typedArray);
        assert.strictEqual(dataView.getUint32(36, true), 0x2);
        assert.strictEqual(dataView.getUint32(40, true), 0x2);
    });

    it('should create nested structure', () => {

        const triangleStructure = new Binary.Structure({
            components: [
                new Binary.Component({
                    count: 2,
                    name: 'position',
                    type: 'vec3<u32>',
                }),
                new Binary.Component({
                    count: 2,
                    name: 'normal',
                    type: 'vec3<f32>',
                }),
            ],
            name: 'Triangle',
        });

        const lightStructure = new Binary.Structure({
            components: [
                new Binary.Component({
                    name: 'position',
                    type: 'vec3<f32>',
                }),
                new Binary.Component({
                    name: 'color',
                    type: 'vec3<f32>',
                }),
                new Binary.Component({
                    count: 2,
                    name: 'triangle',
                    type: triangleStructure,
                }),
            ],
            name: 'Light',
        });

        const structure = new Binary.Structure({
            components: [
                new Binary.Component({
                    name: 'ambient',
                    type: 'vec3<f32>',
                }),
                new Binary.Component({
                    count: 2,
                    name: 'light',
                    type: lightStructure,
                }),
            ],
            name: 'Block',
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

        accessor.fields.light.items[1].fields.triangle.items[1].fields.position.writeElement(0, [1, 2, 3,]);
        assert.strictEqual(dataView.getInt32(204, true), 1);
        assert.strictEqual(dataView.getInt32(208, true), 2);
        assert.strictEqual(dataView.getInt32(212, true), 3);
    });
});
