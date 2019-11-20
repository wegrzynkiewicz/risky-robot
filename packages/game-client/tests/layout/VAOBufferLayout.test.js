import assert from "assert";
import VAOLayout from "../../src/layout/VAOLayout";
import VAOBufferLayout from "../../src/layout/VAOBufferLayout";

function assertAllocation(vaoAllocation, attributeName, expectedStride, expectedOffset) {
    const {stride, offset} = vaoAllocation.getAttributeAllocationByName(attributeName);
    assert.strictEqual(
        stride,
        expectedStride,
        `Invalid stride attribute named (${attributeName})`
    );
    assert.strictEqual(
        offset,
        expectedOffset,
        `Invalid offset attribute named (${attributeName})`
    );
}

describe("VAOBufferLayout", function () {

    it("should calculate valid buffer byte length", function () {
        const vaoLayout = new VAOLayout({
            primitive: "triangle",
            elements: 2,
            buffers: [
                new VAOBufferLayout({
                    schema: "ab/c/d",
                    attributes: [
                        new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}), // 12
                        new VAOLayout.Attribute({name: "a_VertexTexCoords", type: "vec2<f32>"}), // 8
                        new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>", divisor: 1}), // 12
                        new VAOLayout.Attribute({name: "a_VertexColor", type: "vec4<f32>", divisor: 2}), // 16
                    ],
                })
            ],
        });
        const [vaoBufferLayout] = vaoLayout.buffers;

        const verticesCount = 6;
        const vaoAllocation = vaoBufferLayout.createVAOAllocation(vaoLayout);
        const expectedLength = v => (v * 12) + (v * 8) + (v / 3 * 12) + (v / 6 * 16);
        assert.strictEqual(vaoLayout.getVerticesCount(), verticesCount, "Invalid vertices count");
        assert.strictEqual(vaoAllocation.getByteLength(), expectedLength(verticesCount));
    });

    it("should calculate valid stride and offset", function () {
        const vaoLayout = new VAOLayout({
            primitive: "triangle",
            elements: 10,
            buffers: [
                new VAOBufferLayout({
                    schema: "abc/de/f/g/hijk",
                    attributes: [
                        new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}), // 12
                        new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>"}), // 12
                        new VAOLayout.Attribute({name: "a_VertexTexCoords", type: "vec2<f32>"}), // 8

                        new VAOLayout.Attribute({name: "a_VertexColor", type: "vec4<f32>"}), // 16
                        new VAOLayout.Attribute({name: "a_VertexNegativeColor", type: "f32"}), // 4

                        new VAOLayout.Attribute({name: "a_VertexWeight", type: "s16"}), // 2

                        new VAOLayout.Attribute({name: "a_VertexVisibility", type: "s8"}), // 1

                        new VAOLayout.Attribute({name: "a_VertexAdditional1", type: "u8"}), // 1
                        new VAOLayout.Attribute({name: "a_VertexAdditional2", type: "u16"}), // 2
                        new VAOLayout.Attribute({name: "a_VertexAdditional3", type: "u32"}), // 4
                        new VAOLayout.Attribute({name: "a_VertexAdditional4", type: "vec4<s16>"}), // 8
                    ],
                }),
            ],
        });


        const [vaoBufferLayout] = vaoLayout.buffers;
        const vaoAllocation = vaoBufferLayout.createVAOAllocation(vaoLayout);
        const verticesCount = 30;

        assertAllocation(vaoAllocation, "a_VertexPosition", 32, 0);
        assertAllocation(vaoAllocation, "a_VertexNormal", 32, 12);
        assertAllocation(vaoAllocation, "a_VertexTexCoords", 32, 24);

        const block1Offset = verticesCount * 32;
        assertAllocation(vaoAllocation, "a_VertexColor", 20, block1Offset);
        assertAllocation(vaoAllocation, "a_VertexNegativeColor", 20, block1Offset + 16);

        const block2Offset = block1Offset + (verticesCount * 20);
        assertAllocation(vaoAllocation, "a_VertexWeight", 2, block2Offset);

        const block3Offset = block2Offset + (verticesCount * 2);
        assertAllocation(vaoAllocation, "a_VertexVisibility", 1, block3Offset);

        const block4Offset = block3Offset + verticesCount;
        assertAllocation(vaoAllocation, "a_VertexAdditional1", 15, block4Offset);
        assertAllocation(vaoAllocation, "a_VertexAdditional2", 15, block4Offset + 1);
        assertAllocation(vaoAllocation, "a_VertexAdditional3", 15, block4Offset + 3);
        assertAllocation(vaoAllocation, "a_VertexAdditional4", 15, block4Offset + 7);

        const verticesPerPrimitive = 3;
        const vertexByteLength = 70;
        const byteLength = verticesCount * vertexByteLength;
        assert.strictEqual(vaoAllocation.getByteLength(verticesPerPrimitive), byteLength);
    })
        ;
    });