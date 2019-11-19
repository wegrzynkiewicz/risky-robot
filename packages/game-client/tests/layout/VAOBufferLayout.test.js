import assert from "assert";
import VAOBufferLayout from "../../src/layout/VAOBufferLayout";

function assertAllocation(vaoAllocation, attributeName, stride, offset) {
    assert.strictEqual(
        vaoAllocation.getStride(attributeName),
        stride,
        `Invalid stride attribute named (${attributeName})`
    );
    assert.strictEqual(
        vaoAllocation.getOffset(attributeName),
        offset,
        `Invalid offset attribute named (${attributeName})`
    );
}

describe("VAOBufferLayout", function () {
    it(`should calculate valid stride and offset`, function () {
        const vaoBufferLayout = new VAOBufferLayout({
            schema: "abc/de/f/g/hijk",
            attributes: [
                new VAOBufferLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
                new VAOBufferLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>"}),
                new VAOBufferLayout.Attribute({name: "a_VertexTexCoords", type: "vec2<f32>"}),

                new VAOBufferLayout.Attribute({name: "a_VertexColor", type: "vec4<f32>"}),
                new VAOBufferLayout.Attribute({name: "a_VertexNegativeColor", type: "f32"}),

                new VAOBufferLayout.Attribute({name: "a_VertexWeight", type: "s16"}),

                new VAOBufferLayout.Attribute({name: "a_VertexVisibility", type: "s8"}),

                new VAOBufferLayout.Attribute({name: "a_VertexAdditional1", type: "u8"}),
                new VAOBufferLayout.Attribute({name: "a_VertexAdditional2", type: "u16"}),
                new VAOBufferLayout.Attribute({name: "a_VertexAdditional3", type: "u32"}),
                new VAOBufferLayout.Attribute({name: "a_VertexAdditional4", type: "vec4<s16>"}),
            ],
        });

        const verticesCount = 1;
        const vaoAllocation = vaoBufferLayout.createVAOAllocation(verticesCount);

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
    });
});
