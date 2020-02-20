import assert from "assert";
import * as Binary from "robo24-binary";
import * as Graphic from "../../..";

describe("VAOLayoutBlueprint", function () {
    it("should create valid layout object", function () {

        const lightStructure = new Binary.Structure({
            name: "Light",
            components: [
                new Binary.Component({
                    name: "position",
                    type: "vec3<f32>",
                }),
                new Binary.Component({
                    name: "color",
                    type: "vec3<f32>",
                }),
            ],
        });

        const uniformBlockStructure = new Binary.Structure({
            name: "TestBlock",
            components: [
                new Binary.Component({
                    name: "ColorRed",
                    type: "vec3<f32>",
                }),
                new Binary.Component({
                    name: "light",
                    type: structure,
                    count: 3,
                }),
            ],
        });

        const blueprint = new Graphic.UniformBlockBlueprint({
            structure: uniformBlockStructure,
        });

        const layout = blueprint.createLayout({
            primitive: "triangle",
            verticesCount: 12,
        });
    });
});
