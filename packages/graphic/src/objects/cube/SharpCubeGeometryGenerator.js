import emitVertexDataset from "./emitVertexDataset";
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
                                name: "a_VertexPosition_0",
                                type: "vec3<f32>"
                            }),
                            new VertexLayoutBlueprint.Attribute({
                                name: "a_VertexNormal_0",
                                type: "vec3<f32>"
                            }),
                            new VertexLayoutBlueprint.Attribute({
                                name: "a_VertexTextureCoords_0",
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

const indicesOffsets = [0, 1, 2, 0, 2, 3];

export default function generateSharpCubeGeometry() {
    const cubeLayout = getCubeBufferLayout();

    const primaryBufferLayout = cubeLayout.getBufferLayout("primary");
    const primaryDataView = primaryBufferLayout.createDataView();
    const vertexPositionAccessor = primaryBufferLayout.getAccessorByName("a_VertexPosition_0");
    const vertexNormalAccessor = primaryBufferLayout.getAccessorByName("a_VertexNormal_0");
    const vertexTextureCordsAccessor = primaryBufferLayout.getAccessorByName("a_VertexTextureCoords_0");

    let vertexIndex = 0;
    const put = (positionAxes, textureCoordsAxes, normalCodeAxes) => {
        vertexPositionAccessor.write(primaryDataView, vertexIndex, positionAxes);
        vertexTextureCordsAccessor.write(primaryDataView, vertexIndex, textureCoordsAxes);
        vertexNormalAccessor.write(primaryDataView, vertexIndex, normalCodeAxes);
        vertexIndex++;
    };

    emitVertexDataset(put);

    const indicesBufferLayout = cubeLayout.getBufferLayout("indices");
    const indicesDataView = indicesBufferLayout.createDataView();
    const indicesAccessor = indicesBufferLayout.getIndexAccessor();

    for (let i = 0; i < 6; i++) {
        for (let index of indicesOffsets) {
            indicesAccessor.write(indicesDataView, indicesOrder, vertexIndex);
            indicesOrder++;
        }
    }
}
