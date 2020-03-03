import assert from 'assert';
import VAOLayout from '../../src/layout/VAOLayout';
import VAOBufferLayout from '../../src/layout/VAOBufferLayout';

function assertAllocation(vaoAllocation, attributeName, expectedStride, expectedOffset) {
    const {stride, offset} = vaoAllocation.getAttributeAllocationByName(attributeName);
    assert.strictEqual(
        stride,
        expectedStride,
        `Invalid stride attribute named (${attributeName})`,
    );
    assert.strictEqual(
        offset,
        expectedOffset,
        `Invalid offset attribute named (${attributeName})`,
    );
}

describe('VAOBufferLayout', function () {

    it('should calculate valid buffer byte length', function () {

        const vaoBufferLayout = new VAOBufferLayout({
            type: 'array',
            schema: 'ab/c/d',
            attributes: [
                new VAOLayout.Attribute({name: 'a_Position', type: 'vec3<f32>'}), // 12
                new VAOLayout.Attribute({name: 'a_TexCoords', type: 'vec2<f32>'}), // 8
                new VAOLayout.Attribute({name: 'a_Normal', type: 'vec3<f32>', divisor: 1}), // 12
                new VAOLayout.Attribute({name: 'a_Color', type: 'vec4<f32>', divisor: 2}), // 16
            ],
        });

        const vaoLayout = new VAOLayout({
            primitive: 'triangle',
            elements: 2,
        });

        const verticesCount = 6;
        const vaoAllocation = vaoBufferLayout.createVAOAllocation(vaoLayout);
        const expectedLength = v => (v * 12) + (v * 8) + (v / 3 * 12) + (v / 6 * 16);
        assert.strictEqual(vaoLayout.vertices, verticesCount, 'Invalid vertices count');
        assert.strictEqual(vaoAllocation.getByteLength(), expectedLength(verticesCount));
    });

    it('should calculate valid stride and offset', function () {


        const vaoBufferLayout = new VAOBufferLayout({
            type: 'array',
            schema: 'abc/de/f/g/hijk',
            attributes: [
                new VAOLayout.Attribute({name: 'a_Position', type: 'vec3<f32>'}), // 12
                new VAOLayout.Attribute({name: 'a_Normal', type: 'vec3<f32>'}), // 12
                new VAOLayout.Attribute({name: 'a_TexCoords', type: 'vec2<f32>'}), // 8

                new VAOLayout.Attribute({name: 'a_Color', type: 'vec4<f32>'}), // 16
                new VAOLayout.Attribute({name: 'a_VertexNegativeColor', type: 'f32'}), // 4

                new VAOLayout.Attribute({name: 'a_VertexWeight', type: 's16'}), // 2

                new VAOLayout.Attribute({name: 'a_VertexVisibility', type: 's8'}), // 1

                new VAOLayout.Attribute({name: 'a_VertexAdditional1', type: 'u16'}), // 2
                new VAOLayout.Attribute({name: 'a_VertexAdditional2', type: 'u16'}), // 2
                new VAOLayout.Attribute({name: 'a_VertexAdditional3', type: 'u32'}), // 4
                new VAOLayout.Attribute({name: 'a_VertexAdditional4', type: 'vec4<s16>'}), // 8
            ],
        });

        const vaoLayout = new VAOLayout({
            primitive: 'triangle',
            elements: 10,
        });

        const vaoAllocation = vaoBufferLayout.
        createVAOAllocation(vaoLayout);
        const verticesCount = 30;

        assertAllocation(vaoAllocation, 'a_Position', 32, 0);
        assertAllocation(vaoAllocation, 'a_Normal', 32, 12);
        assertAllocation(vaoAllocation, 'a_TexCoords', 32, 24);

        const block1Offset = verticesCount * 32;
        assertAllocation(vaoAllocation, 'a_Color', 20, block1Offset);
        assertAllocation(vaoAllocation, 'a_VertexNegativeColor', 20, block1Offset + 16);

        const block2Offset = block1Offset + (verticesCount * 20);
        assertAllocation(vaoAllocation, 'a_VertexWeight', 2, block2Offset);

        const block3Offset = block2Offset + (verticesCount * 2);
        assertAllocation(vaoAllocation, 'a_VertexVisibility', 1, block3Offset);

        const block4Offset = block3Offset + verticesCount;
        assertAllocation(vaoAllocation, 'a_VertexAdditional1', 16, block4Offset);
        assertAllocation(vaoAllocation, 'a_VertexAdditional2', 16, block4Offset + 2);
        assertAllocation(vaoAllocation, 'a_VertexAdditional3', 16, block4Offset + 4);
        assertAllocation(vaoAllocation, 'a_VertexAdditional4', 16, block4Offset + 8);

        const vertexByteLength = 71;
        const byteLength = verticesCount * vertexByteLength;
        assert.strictEqual(vaoAllocation.getByteLength(), byteLength);
    });
});
