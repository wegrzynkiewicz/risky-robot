import * as glMatrix from "gl-matrix";
import * as glHelper from "../helpers/glHelper";

export default function getPerspectiveMatrix(width, height) {

    const projectionMatrix = glMatrix.mat4.create();

    const fieldOfView = glHelper.radian(45);
    const aspect = width / height;
    const zNear = 0.1;
    const zFar = 100.0;

    glMatrix.mat4.perspective(
        projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar
    );

    return projectionMatrix;
}
