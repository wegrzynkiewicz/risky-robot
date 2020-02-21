import assert from "assert";
import * as Binary from "robo24-binary";
import * as Graphic from "../../..";

describe("VAOLayoutBlueprint", function () {
    it("should create valid layout object", function () {

        const lightStructure = Binary.Structure.compose({
            name: "Light",
            components: [
                {name: "position", type: "vec3<f32>"},
                {name: "color", type: "vec3<f32>"},
            ],
        });

        const structure = Binary.Structure.compose({
            name: "TestBlock",
            components: [
                {name: "strength", type: "f32"},
                {name: "ambient", type: "vec3<f32>"},
                {name: "light", type: lightStructure, count: 3},
            ],
        });

        const blueprint = new Graphic.UniformBlockBlueprint({structure});

        const layout = blueprint.createLayout({
            primitive: "triangle",
            verticesCount: 12,
        });
    });
});
