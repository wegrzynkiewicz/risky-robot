export default {

    points() {
        const verticesBufferSize = 6 * 3;
        const verticesBuffer = new Float32Array(verticesBufferSize);

        let vertexBufferIndex = 0;

        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;

        return verticesBuffer;
    },

    lines() {
        const verticesBufferSize = 3 * 4 * 3;
        const verticesBuffer = new Float32Array(verticesBufferSize);

        let vertexBufferIndex = 0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;


        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;


        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;

        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 0.0;
        verticesBuffer[vertexBufferIndex++] = 1.0;

        return verticesBuffer;
    }
}
