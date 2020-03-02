import * as glMatrix from 'gl-matrix';

export default function getOrthographicMatrix(width, height) {

    const projectionMatrix = glMatrix.mat4.create();

    glMatrix.mat4.ortho(
        projectionMatrix,
        -(width/2),
        (width/2),
        -(height/2),
        (height/2),
        -10000,
        10000,
    );

    return projectionMatrix;
}
