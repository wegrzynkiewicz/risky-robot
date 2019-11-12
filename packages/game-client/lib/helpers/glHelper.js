const degree = Math.PI / 180;

export function radian(a) {
    return a * degree;
}

export function vec2(x, y) {
    const vector = new Float32Array(2);
    vector[0] = x;
    vector[1] = y;
    return vector;
}

export function vec3(x, y, z) {
    const vector = new Float32Array(3);
    vector[0] = x;
    vector[1] = y;
    vector[2] = z;
    return vector;
}

export function vec4(x, y, z, w) {
    const vector = new Float32Array(3);
    vector[0] = x;
    vector[1] = y;
    vector[2] = z;
    vector[3] = w;
    return vector;
}
