import assert from 'assert';
import Allocation from '../../../src/vao/layout/Allocation';
import VAOLayoutBlueprint from '../../../src/vao/blueprint/VAOLayoutBlueprint';

function assertAttributeLayout(bufferLayout, attributeName, expectedStride, expectedOffset) {
    const attributeLayout = bufferLayout.getAttributeLayoutByName(attributeName);
    const {byteOffset, byteStride} = attributeLayout;
    assert.strictEqual(
        byteStride,
        expectedStride,
        `Invalid stride attribute named (${attributeName}) expected (${expectedStride}) actual (${byteStride})`
    );
    assert.strictEqual(
        byteOffset,
        expectedOffset,
        `Invalid offset attribute named (${attributeName}) expected (${expectedOffset}) actual (${byteOffset})`
    );
}

describe('ArrayBufferBlueprint', function () {

    it('should create valid ArrayBufferLayout object', function () {
        const bufferBlueprint = new VAOLayoutBlueprint.ArrayBuffer({
            batches: [
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_Position',
                            type: 'vec3<f32>'
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_TexCoords',
                            type: 'vec2<f32>'
                        }),
                    ],
                }),
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_Normal',
                            type: 'vec3<f32>',
                            divisor: 1
                        }),
                    ],
                }),
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_Color',
                            type: 'vec4<f32>',
                            divisor: 2
                        }),
                    ],
                }),
            ],
        });

        const allocation = new Allocation({
            openGLPrimitiveType: WebGL2RenderingContext['TRIANGLES'],
            verticesCount: 6,
        });

        const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
        const verticesCount = 6;
        const expectedLength = v => (v * 12) + (v * 8) + (v / 3 * 12) + (v / 6 * 16);
        assert.strictEqual(bufferLayout.byteLength, expectedLength(verticesCount));
    });

    it('should create valid complex ArrayBufferLayout object', function () {
        const bufferBlueprint = new VAOLayoutBlueprint.ArrayBuffer({
            batches: [
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_Position',
                            type: 'vec3<f32>'
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_Normal',
                            type: 'vec3<f32>'
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_TexCoords',
                            type: 'vec2<f32>'
                        }),
                    ],
                }),
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_Color',
                            type: 'vec4<f32>'
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_VertexNegativeColor',
                            type: 'f32'
                        }),
                    ],
                }),
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_VertexWeight',
                            type: 's16'
                        }),
                    ],
                }),
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_VertexVisibility',
                            type: 's8'
                        }),
                    ],
                }),
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_VertexAdditional1',
                            type: 'u16'
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_VertexAdditional2',
                            type: 'u16'
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_VertexAdditional3',
                            type: 'u32'
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: 'a_VertexAdditional4',
                            type: 'vec4<s16>'
                        }),
                    ],
                }),

            ],
        });

        const allocation = new Allocation({
            openGLPrimitiveType: WebGL2RenderingContext['TRIANGLES'],
            verticesCount: 30,
        });

        const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
        const verticesCount = 30;

        assertAttributeLayout(bufferLayout, 'a_Position', 32, 0);
        assertAttributeLayout(bufferLayout, 'a_Normal', 32, 12);
        assertAttributeLayout(bufferLayout, 'a_TexCoords', 32, 24);

        const block1Offset = verticesCount * 32;
        assertAttributeLayout(bufferLayout, 'a_Color', 20, block1Offset);
        assertAttributeLayout(bufferLayout, 'a_VertexNegativeColor', 20, block1Offset + 16);

        const block2Offset = block1Offset + (verticesCount * 20);
        assertAttributeLayout(bufferLayout, 'a_VertexWeight', 2, block2Offset);

        const block3Offset = block2Offset + (verticesCount * 2);
        assertAttributeLayout(bufferLayout, 'a_VertexVisibility', 1, block3Offset);

        const block4Offset = block3Offset + verticesCount;
        assertAttributeLayout(bufferLayout, 'a_VertexAdditional1', 16, block4Offset);
        assertAttributeLayout(bufferLayout, 'a_VertexAdditional2', 16, block4Offset + 2);
        assertAttributeLayout(bufferLayout, 'a_VertexAdditional3', 16, block4Offset + 4);
        assertAttributeLayout(bufferLayout, 'a_VertexAdditional4', 16, block4Offset + 8);

        const vertexByteLength = 71;
        const byteLength = verticesCount * vertexByteLength;
        assert.strictEqual(bufferLayout.byteLength, byteLength);
    });
});
