import assert from "assert";
import Layout from "../../../../src/vao/layout/Layout";

describe("Layout", function () {
    it("should create valid allocation object", function () {
        const layout = new Layout({
            buffers: [
                new Layout.ArrayBuffer({
                    name: "primary",
                    batches: [
                        new Layout.AttributeBatch({
                            attributes: [
                                new Layout.Attribute({
                                    name: "a_VertexPosition",
                                    type: "vec3<f32>"
                                }),
                                new Layout.Attribute({
                                    name: "a_VertexNormal",
                                    type: "vec3<f32>"
                                }),
                            ],
                        }),
                        new Layout.AttributeBatch({
                            attributes: [
                                new Layout.Attribute({
                                    name: "a_VertexColor",
                                    type: "vec3<u8>",
                                    normalize: true
                                }),
                            ]
                        }),
                    ],
                }),
                new Layout.ElementArrayBuffer({
                    name: "indices",
                }),
            ],
        });

        const allocation = layout.createAllocation({
            primitive: "triangle",
            elementsCount: 4,
        });
    });
});
