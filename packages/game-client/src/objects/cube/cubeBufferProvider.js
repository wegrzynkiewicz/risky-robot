import cubeVAOLayout from './cubeVAOLayout';
import cubeVertexDataset from './cubeVertexDataset';

export default function cubeBufferProvider() {
    const verticesCount = cubeVAOLayout.vertices;
    const [bufferLayout] = cubeVAOLayout.buffers;
    const vaoAllocation = bufferLayout.createVAOAllocation(cubeVAOLayout);
    const dataView = vaoAllocation.createArrayBufferByDataView();

    const positionAllocation = vaoAllocation.getAttributeAllocationByName('a_Position');
    let verticesIndex = 0;
    for (let i = 0; i < 6; i++) {
        for (let index of [0, 1, 2, 0, 2, 3]) {
            const vertexAxis = cubeVertexDataset.vertices[i * 4 + index];
            positionAllocation.write(dataView, verticesIndex++, vertexAxis);
        }
    }

    const colorBuffer = new Uint8Array([127, 127, 127]);
    const colorAllocation = vaoAllocation.getAttributeAllocationByName('a_Color');
    for (let i = 0; i < verticesCount; i++) {
        colorAllocation.write(dataView, i, colorBuffer);
    }

    return dataView.buffer;
}

SharpIndexedCube
