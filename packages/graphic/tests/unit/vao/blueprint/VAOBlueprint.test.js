import assert from "assert";
import VAOBlueprint from "../../../../src/vao/blueprint/VAOBlueprint";

describe("VAOBlueprint", function () {
    it("should create valid allocation object", function () {
        const blueprint = new VAOBlueprint({
            buffers: [
                new VAOBlueprint.ArrayBuffer({
                    name: "primary",
                    batches: [
                        new VAOBlueprint.AttributeBatch({
                            attributes: [
                                new VAOBlueprint.Attribute({
                                    name: "a_VertexPosition",
                                    type: "vec3<f32>"
                                }),
                                new VAOBlueprint.Attribute({
                                    name: "a_VertexNormal",
                                    type: "vec3<f32>"
                                }),
                            ],
                        }),
                        new VAOBlueprint.AttributeBatch({
                            attributes: [
                                new VAOBlueprint.Attribute({
                                    name: "a_VertexColor",
                                    type: "vec3<u8>",
                                    normalize: true
                                }),
                            ]
                        }),
                    ],
                }),
                new VAOBlueprint.ElementArrayBuffer({
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
