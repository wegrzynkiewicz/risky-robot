import assert from "assert";

describe("VAOLayoutBlueprint", function () {
    it("should create valid layout object", function () {

        const structure = new UniformBlockBlueprint.Structure({
            name: "Light",
            variables: [
                new UniformBlockBlueprint.Variable({
                    name: "position",
                    type: "vec3<f32>",
                }),
                new UniformBlockBlueprint.Variable({
                    name: "color",
                    type: "vec3<f32>",
                }),
            ],
        });

        const blueprint = new UniformBlockBlueprint({
            name: "TestBlock",
            variables: [
                new UniformBlockBlueprint.Variable({
                    name: "ColorRed",
                    type: "vec3<f32>",
                }),
                new UniformBlockBlueprint.Array({
                    name: "light",
                    type: structure,
                    elements: 3,
                }),
            ],
        });

        const layout = blueprint.createLayout({
            primitive: "triangle",
            verticesCount: 12,
        });
    });
});
