import assert from "assert";
import Allocation from "../../../../src/vao/layout/Allocation";
import VertexLayoutBlueprint from "../../../../src/vao/blueprint/VertexLayoutBlueprint";

describe("ArrayBufferBlueprint", function () {
    it("should create valid ArrayBufferAllocation object", function () {
        const bufferBlueprint = new VertexLayoutBlueprint.ArrayBuffer({
            batches: [
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexPosition",
                            type: "vec3<f32>"
                        }),
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexTexCoords",
                            type: "vec2<f32>"
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
                            name: "a_VertexNormal",
                            type: "vec3<f32>",
                            divisor: 1
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VertexLayoutBlueprint.Attribute({
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

        const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
        const verticesCount = 6;
        const expectedLength = v => (v * 12) + (v * 8) + (v / 3 * 12) + (v / 6 * 16);
        assert.strictEqual(bufferLayout.byteLength, expectedLength(verticesCount));
    });
});
