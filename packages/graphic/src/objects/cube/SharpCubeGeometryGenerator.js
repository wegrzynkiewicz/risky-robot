import CubeVertexDataset from "./CubeVertexDataset";
import VertexLayoutBlueprint from "../../vao/blueprint/VertexLayoutBlueprint";

function getCubeBufferLayout() {
    const cubeBlueprint = new VertexLayoutBlueprint({
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
                            new VertexLayoutBlueprint.Attribute({
                                name: "a_VertexTextureCoords",
                                type: "vec2<f32>"
                            }),
                        ],
                    }),
                ],
            }),
            new VertexLayoutBlueprint.ElementArrayBuffer({
                name: "indices",
            }),
        ],
    });

    const cubeLayout = cubeBlueprint.createLayout({
        primitive: "triangle",
        elementsCount: 6 * 2,
    });

    return cubeLayout;
}

export default function generateSharpCubeGeometry() {
    const cubeDataset = new CubeVertexDataset();
    const cubeLayout = getCubeBufferLayout();

}
