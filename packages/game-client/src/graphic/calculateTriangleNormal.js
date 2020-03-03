import * as glMatrix from 'gl-matrix';

export default function calculateNormal (a, b, c) {
    const s1 = glMatrix.vec3.create();
    const s2 = glMatrix.vec3.create();
    const s3 = glMatrix.vec3.create();
    const s4 = glMatrix.vec3.create();
    glMatrix.vec3.sub(s1, b, a);
    glMatrix.vec3.sub(s2, c, a);
    glMatrix.vec3.cross(s3, s2, s1);
    glMatrix.vec3.normalize(s4, s3);

    return s4;
}
