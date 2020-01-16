import assert from "assert";
import VertexLayoutBlueprint from "../../../../src/vao/blueprint/VertexLayoutBlueprint";

describe("VertexLayoutBlueprint", function () {
    it("should create valid allocation object", function () {
        const blueprint = new VertexLayoutBlueprint({
            buffers: [
                new VertexLayoutBlueprint.ArrayBuffer({
                    name: "primary",
                    batches: [
                        new VertexLayoutBlueprint.AttributeBatch({
                            attributes: [
                                new VertexLayoutBlueprint.Attribute({
                                    name: "a_VertexPosition",
                                    type: "vec3<f32>"
                                }),
                                new VertexLayoutBlueprint.Attribute({
                                    name: "a_VertexNormal",
                                    type: "vec3<f32>"
                                }),
                            ],
                        }),
                        new VertexLayoutBlueprint.AttributeBatch({
                            attributes: [
                                new VertexLayoutBlueprint.Attribute({
                                    name: "a_VertexColor",
                                    type: "vec3<u8>",
                                    normalize: true
                                }),
                            ]
                        }),
                    ],
                }),
                new VertexLayoutBlueprint.ElementArrayBuffer({
                    name: "indices",
                }),
            ],
        });

        const layout = blueprint.createLayout({
            primitive: "triangle",
            elementsCount: 4,
        });
    });
});
