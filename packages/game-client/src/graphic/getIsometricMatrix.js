import * as glMatrix from 'gl-matrix';
import * as glHelper from '../helpers/glHelper';

export default function getIsometricMatrix(x, y) {

    const isometricMatrix4 = glMatrix.mat4.create();

    glMatrix.mat4.rotateX(
        isometricMatrix4,
        isometricMatrix4,
        Math.asin(glHelper.radian(y)),
    );

    glMatrix.mat4.rotateY(
        isometricMatrix4,
        isometricMatrix4,
        glHelper.radian(x),
    );

    return isometricMatrix4;
}
