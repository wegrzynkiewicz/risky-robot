import cubeVAOLayout from "./cubeVAOLayout";
import cubeVertexDataset from "./cubeVertexDataset";

export default function cubeBufferProvider() {

    const [bufferLayout] = cubeVAOLayout.buffers;
    const vaoAllocation = bufferLayout.createVAOAllocation(cubeVAOLayout.vertices);
    const builder = vaoAllocation.createVAOBufferBuilder();

    const verticesIndex = 0;
    for (let i = 0; i < 6; i++) {
        for (let index of [0, 1, 2, 0, 2, 3]) {
            const vertexAxis = cubeVertexDataset.vertices[i * 4 + index];
            vaoAllocation.put({
                buffer,
                attribute: "a_VertexPosition",
                index: verticesIndex++,
                data: vertexAxis,
            });
        }
    }
}
