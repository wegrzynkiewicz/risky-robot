import assert from "assert";
import Layout from "../../../../src/vao/layout/Layout";
import Allocation from "../../../../src/vao/allocation/Allocation";

describe("ArrayBufferLayout", function () {
    it("should create valid ArrayBufferAllocation object", function () {
        const bufferLayout = new Layout.ArrayBuffer({
            batches: [
                new Layout.AttributeBatch({
                    attributes: [
                        new Layout.Attribute({
                            name: "a_VertexPosition",
                            type: "vec3<f32>"
                        }),
                        new Layout.Attribute({
                            name: "a_VertexTexCoords",
                            type: "vec2<f32>"
                        }),
                    ],
                }),
                new Layout.AttributeBatch({
                    attributes: [
                        new Layout.Attribute({
                            name: "a_VertexNormal",
                            type: "vec3<f32>",
                            divisor: 1
                        }),
                    ],
                }),
                new Layout.AttributeBatch({
                    attributes: [
                        new Layout.Attribute({
                            name: "a_VertexColor",
                            type: "vec4<f32>",
                            divisor: 2
                        }),
                    ],
                }),
            ],
        });

        const allocation = new Allocation({
            primitive: "triangle",
            elementsCount: 2,
        });

        const bufferAllocation = bufferLayout.createBufferAllocation({allocation});
        const verticesCount = 6;
        const expectedLength = v => (v * 12) + (v * 8) + (v / 3 * 12) + (v / 6 * 16);
        assert.strictEqual(bufferAllocation.byteLength, expectedLength(verticesCount));
    });
});
