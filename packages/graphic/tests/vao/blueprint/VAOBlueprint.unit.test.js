import assert from "assert";
import VAOLayoutBlueprint from "../../../src/vao/blueprint/VAOLayoutBlueprint";

describe("VAOLayoutBlueprint", function () {
    it("should create valid layout object", function () {
        const blueprint = new VAOLayoutBlueprint({
            attributeBufferBlueprints: [
                new VAOLayoutBlueprint.ArrayBuffer({
                    name: "primary",
                    batchBlueprints: [
                        new VAOLayoutBlueprint.AttributeBatch({
                            attributeBlueprint: [
                                new VAOLayoutBlueprint.Attribute({
                                    name: "a_Position",
                                    type: "vec3<f32>"
                                }),
                                new VAOLayoutBlueprint.Attribute({
                                    name: "a_Normal",
                                    type: "vec3<f32>"
                                }),
                            ],
                        }),
                        new VAOLayoutBlueprint.AttributeBatch({
                            attributeBlueprint: [
                                new VAOLayoutBlueprint.Attribute({
                                    name: "a_Color",
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
            openGLPrimitiveType: WebGL2RenderingContext["TRIANGLES"],
            verticesCount: 12,
            indicesCount: 4,
        });
    });
});
