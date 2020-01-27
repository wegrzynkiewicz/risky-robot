import assert from "assert";
import VAOLayoutBlueprint from "../../../src/vao/blueprint/VAOLayoutBlueprint";

describe("VertexLayoutBlueprint", function () {
    it("should create valid layout object", function () {
        const blueprint = new VAOLayoutBlueprint({
            buffers: [
                new VAOLayoutBlueprint.ArrayBuffer({
                    name: "primary",
                    batches: [
                        new VAOLayoutBlueprint.AttributeBatch({
                            attributes: [
                                new VAOLayoutBlueprint.Attribute({
                                    name: "a_VertexPosition",
                                    type: "vec3<f32>"
                                }),
                                new VAOLayoutBlueprint.Attribute({
                                    name: "a_VertexNormal",
                                    type: "vec3<f32>"
                                }),
                            ],
                        }),
                        new VAOLayoutBlueprint.AttributeBatch({
                            attributes: [
                                new VAOLayoutBlueprint.Attribute({
                                    name: "a_VertexColor",
                                    type: "vec3<u8>",
                                    normalize: true
                                }),
                            ]
                        }),
                    ],
                }),
                new VAOLayoutBlueprint.ElementArrayBuffer({
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
