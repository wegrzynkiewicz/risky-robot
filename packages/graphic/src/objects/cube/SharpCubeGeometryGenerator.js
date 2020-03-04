// TODO: refactor

import VAOLayoutBlueprint from '../../vao/blueprint/VAOLayoutBlueprint';
import emitVertexDataset from './emitVertexDataset';

function getCubeBufferLayout() {
    const cubeBlueprint = new VAOLayoutBlueprint({
        buffers: [
            new VAOLayoutBlueprint.ArrayBuffer({
                batches: [
                    new VAOLayoutBlueprint.AttributeBatch({
                        attributes: [
                            new VAOLayoutBlueprint.Attribute({
                                name: 'a_Position_0',
                                type: 'vec3<f32>',
                            }),
                            new VAOLayoutBlueprint.Attribute({
                                name: 'a_Normal_0',
                                type: 'vec3<f32>',
                            }),
                            new VAOLayoutBlueprint.Attribute({
                                name: 'a_TexCoords_0',
                                type: 'vec2<f32>',
                            }),
                        ],
                    }),
                ],
                name: 'primary',
            }),
            new VAOLayoutBlueprint.ElementArrayBuffer({
                name: 'indices',
            }),
        ],
    });

    const cubeLayout = cubeBlueprint.createLayout({
        primitive: 'triangle',
        verticesCount: 6 * 2 * 3,
    });

    return cubeLayout;
}

const indicesOffsets = [0, 1, 2, 0, 2, 3];

export default function generateSharpCubeGeometry() {
    const cubeLayout = getCubeBufferLayout();

    const primaryBufferLayout = cubeLayout.getBufferLayout('primary');
    const primaryDataView = primaryBufferLayout.createDataView();
    const vertexPositionAccessor = primaryBufferLayout.getAccessorByName('a_Position_0');
    const vertexNormalAccessor = primaryBufferLayout.getAccessorByName('a_Normal_0');
    const vertexTextureCordsAccessor = primaryBufferLayout.getAccessorByName('a_TexCoords_0');

    let vertexIndex = 0;
    function put(positionAxes, textureCoordsAxes, normalCodeAxes) {
        vertexPositionAccessor.write(primaryDataView, vertexIndex, positionAxes);
        vertexTextureCordsAccessor.write(primaryDataView, vertexIndex, textureCoordsAxes);
        vertexNormalAccessor.write(primaryDataView, vertexIndex, normalCodeAxes);
        vertexIndex++;
    }

    emitVertexDataset(put);

    const indicesBufferLayout = cubeLayout.getBufferLayout('indices');
    const indicesDataView = indicesBufferLayout.createDataView();
    const indicesAccessor = indicesBufferLayout.getIndexAccessor();

    let indicesOrder = 0;
    for (let i = 0; i < 6; i++) {
        for (const index of indicesOffsets) {
            const vIndex = i * 4 + index;
            indicesAccessor.write(indicesDataView, indicesOrder, vIndex);
            indicesOrder++;
        }
    }
}
