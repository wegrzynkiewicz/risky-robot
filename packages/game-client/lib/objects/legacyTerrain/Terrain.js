import * as glMatrix from "gl-matrix";

const CHUNK_SIZE = 8;

const calculateNormal = function (a, b, c) {
    const s1 = glMatrix.vec3.create();
    const s2 = glMatrix.vec3.create();
    const s3 = glMatrix.vec3.create();
    const s4 = glMatrix.vec3.create();
    glMatrix.vec3.sub(s1, b, a);
    glMatrix.vec3.sub(s2, c, a);
    glMatrix.vec3.cross(s3, s2, s1);
    glMatrix.vec3.normalize(s4, s3);

    return s4;

    // vec3 a = ( gl_in[1].gl_Position - gl_in[0].gl_Position ).xyz;
    // vec3 b = ( gl_in[2].gl_Position - gl_in[0].gl_Position ).xyz;
    // vec3 N = normalize( cross( b, a ) );
};

const obj = {
    size: CHUNK_SIZE,
    vertices() {
        const chunkSize = CHUNK_SIZE;
        const step = 1.0 / (chunkSize / 2);
        const sideWidth = chunkSize + 1;

        const heightMap = [];

        for (let j = 0; j < sideWidth; j++) {
            for (let i = 0; i < sideWidth; i++) {
                const index = j * sideWidth + i;
                heightMap[index] = Math.floor(Math.random() * 2) * (step/4);
            }
        }

        const verticesBufferSize = (chunkSize ** 2) * 6 * 3 + 9;
        const verticesBuffer = new Float32Array(verticesBufferSize);

        const normalBufferSize = (chunkSize ** 2) * 6 * 3 + 9;
        const normalBuffer = new Float32Array(normalBufferSize);

        let vertexBufferIndex = 0;
        let normalBufferIndex = 0;
        let normal;

        for (let j = 0; j < chunkSize; j++) {
            for (let i = 0; i < chunkSize; i++) {

                const x = (step * i) - 1;
                const z = (step * j) - 1;

                const bottomLeftVertexZ = heightMap[j * chunkSize + i];
                const bottomRightVertexZ = heightMap[(j) * chunkSize + i + 1];
                const topLeftVertexZ = heightMap[(j + 1) * chunkSize + i];
                const topRightVertexZ = heightMap[(j + 1) * chunkSize + i + 1];

                const heightDifferentFirst = Math.abs(bottomLeftVertexZ - topRightVertexZ);
                const heightDifferentSecond = Math.abs(bottomRightVertexZ - topLeftVertexZ);
                const rotate = heightDifferentFirst > heightDifferentSecond;

                verticesBuffer[vertexBufferIndex++] = x;
                verticesBuffer[vertexBufferIndex++] = bottomLeftVertexZ;
                verticesBuffer[vertexBufferIndex++] = z;

                if (rotate) {
                    verticesBuffer[vertexBufferIndex++] = x;
                    verticesBuffer[vertexBufferIndex++] = topLeftVertexZ;
                    verticesBuffer[vertexBufferIndex++] = z + step;
                } else {
                    verticesBuffer[vertexBufferIndex++] = x + step;
                    verticesBuffer[vertexBufferIndex++] = topRightVertexZ;
                    verticesBuffer[vertexBufferIndex++] = z + step;
                }

                verticesBuffer[vertexBufferIndex++] = x + step;
                verticesBuffer[vertexBufferIndex++] = bottomRightVertexZ;
                verticesBuffer[vertexBufferIndex++] = z;

                normal = calculateNormal([
                        verticesBuffer[vertexBufferIndex - 9],
                        verticesBuffer[vertexBufferIndex - 8],
                        verticesBuffer[vertexBufferIndex - 7],
                    ], [
                        verticesBuffer[vertexBufferIndex - 3],
                        verticesBuffer[vertexBufferIndex - 2],
                        verticesBuffer[vertexBufferIndex - 1],
                    ], [
                        verticesBuffer[vertexBufferIndex - 6],
                        verticesBuffer[vertexBufferIndex - 5],
                        verticesBuffer[vertexBufferIndex - 4],
                    ]
                );

                for (let k = 0; k <= 2; k++) {
                    normalBuffer[normalBufferIndex++] = normal[0];
                    normalBuffer[normalBufferIndex++] = normal[1];
                    normalBuffer[normalBufferIndex++] = normal[2];
                }

                if (rotate) {
                    verticesBuffer[vertexBufferIndex++] = x + step;
                    verticesBuffer[vertexBufferIndex++] = bottomRightVertexZ;
                    verticesBuffer[vertexBufferIndex++] = z;
                } else {
                    verticesBuffer[vertexBufferIndex++] = x;
                    verticesBuffer[vertexBufferIndex++] = bottomLeftVertexZ;
                    verticesBuffer[vertexBufferIndex++] = z;
                }

                verticesBuffer[vertexBufferIndex++] = x;
                verticesBuffer[vertexBufferIndex++] = topLeftVertexZ;
                verticesBuffer[vertexBufferIndex++] = z + step;

                verticesBuffer[vertexBufferIndex++] = x + step;
                verticesBuffer[vertexBufferIndex++] = topRightVertexZ;
                verticesBuffer[vertexBufferIndex++] = z + step;

                normal = calculateNormal([
                        verticesBuffer[vertexBufferIndex - 9],
                        verticesBuffer[vertexBufferIndex - 8],
                        verticesBuffer[vertexBufferIndex - 7],
                    ], [
                        verticesBuffer[vertexBufferIndex - 3],
                        verticesBuffer[vertexBufferIndex - 2],
                        verticesBuffer[vertexBufferIndex - 1],
                    ], [
                        verticesBuffer[vertexBufferIndex - 6],
                        verticesBuffer[vertexBufferIndex - 5],
                        verticesBuffer[vertexBufferIndex - 4],
                    ]
                );

                for (let k = 0; k <= 2; k++) {
                    normalBuffer[normalBufferIndex++] = normal[0];
                    normalBuffer[normalBufferIndex++] = normal[1];
                    normalBuffer[normalBufferIndex++] = normal[2];
                }
            }
        }

        /*
                verticesBuffer[vertexBufferIndex++] = 0;
                verticesBuffer[vertexBufferIndex++] = -0.4;
                verticesBuffer[vertexBufferIndex++] = 0;

                verticesBuffer[vertexBufferIndex++] = 1;
                verticesBuffer[vertexBufferIndex++] = -0.4;
                verticesBuffer[vertexBufferIndex++] = 1;

                verticesBuffer[vertexBufferIndex++] = 1;
                verticesBuffer[vertexBufferIndex++] = -0.4;
                verticesBuffer[vertexBufferIndex++] = 0;


                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
                normalBuffer[normalBufferIndex++] = 0;
        */
        return {
            vertices: verticesBuffer,
            normals: normalBuffer,
        };
    },

    indices() {
        const CHUNK_SIZE_OFFSET = -(CHUNK_SIZE / 2);
        const vertices = [];
        for (let y = 0; y < CHUNK_SIZE; y++) {
            for (let x = 0; x < CHUNK_SIZE; x++) {
                const blVertexIntex = (CHUNK_SIZE * y) + y + x;
                const tlVertexIntex = (CHUNK_SIZE * (y + 1)) + (y + 1) + x;
                vertices.push(blVertexIntex);
                vertices.push(tlVertexIntex + 1);
                vertices.push(blVertexIntex + 1);

                vertices.push(blVertexIntex);
                vertices.push(tlVertexIntex);
                vertices.push(tlVertexIntex + 1);
            }
        }

        return vertices;
    }
};

const debugIndices = function () {
    let i = 1;
    for (let point of obj.vertices()) {
        process.stdout.write(`${point} `);
        if (i % 3 === 0) {
            process.stdout.write(` - `);
        }
        if (i % 6 === 0) {
            console.log('')
        }
        i++;
    }
};

// debugIndices();

export default obj;


