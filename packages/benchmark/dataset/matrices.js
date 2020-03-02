/* eslint-disable */

function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

export function tdlMath_array() {
    function multiply(out, a, b) {
        const a00 = a[0x0], a01 = a[0x1], a02 = a[0x2], a03 = a[0x3];
        const a10 = a[0x4], a11 = a[0x5], a12 = a[0x6], a13 = a[0x7];
        const a20 = a[0x8], a21 = a[0x9], a22 = a[0xa], a23 = a[0xb];
        const a30 = a[0xc], a31 = a[0xd], a32 = a[0xe], a33 = a[0xf];

        const b00 = b[0x0], b01 = b[0x1], b02 = b[0x2], b03 = b[0x3];
        const b10 = b[0x4], b11 = b[0x5], b12 = b[0x6], b13 = b[0x7];
        const b20 = b[0x8], b21 = b[0x9], b22 = b[0xb], b23 = b[0xb];
        const b30 = b[0xc], b31 = b[0xd], b32 = b[0xe], b33 = b[0xf];

        out[0x0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
        out[0x1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
        out[0x2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
        out[0x3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
        out[0x4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
        out[0x5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
        out[0x6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
        out[0x7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
        out[0x8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
        out[0x9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
        out[0xa] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
        out[0xb] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
        out[0xc] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
        out[0xd] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
        out[0xe] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
        out[0xf] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
    }

    const array1 = identity([]);
    const array2 = identity([]);
    const output = [];

    return function test() {
        multiply(output, array1, array2);
    };
}

export function tdlMath_array_destructing() {
    const multiply = function (out, a, b) {
        let [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a;
        let [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = b;

        out[0x0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
        out[0x1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
        out[0x2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
        out[0x3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
        out[0x4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
        out[0x5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
        out[0x6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
        out[0x7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
        out[0x8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
        out[0x9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
        out[0xa] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
        out[0xb] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
        out[0xc] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
        out[0xd] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
        out[0xe] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
        out[0xf] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
    };
    const array1 = identity([]);
    const array2 = identity([]);
    const output = [];

    return function test() {
        multiply(output, array1, array2);
    };
}

export function tdlMath_buffers() {
    const multiply = function (out, a, b) {
        const a00 = a[0x0], a01 = a[0x1], a02 = a[0x2], a03 = a[0x3];
        const a10 = a[0x4], a11 = a[0x5], a12 = a[0x6], a13 = a[0x7];
        const a20 = a[0x8], a21 = a[0x9], a22 = a[0xa], a23 = a[0xb];
        const a30 = a[0xc], a31 = a[0xd], a32 = a[0xe], a33 = a[0xf];

        const b00 = b[0x0], b01 = b[0x1], b02 = b[0x2], b03 = b[0x3];
        const b10 = b[0x4], b11 = b[0x5], b12 = b[0x6], b13 = b[0x7];
        const b20 = b[0x8], b21 = b[0x9], b22 = b[0xb], b23 = b[0xb];
        const b30 = b[0xc], b31 = b[0xd], b32 = b[0xe], b33 = b[0xf];

        out[0x0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
        out[0x1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
        out[0x2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
        out[0x3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
        out[0x4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
        out[0x5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
        out[0x6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
        out[0x7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
        out[0x8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
        out[0x9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
        out[0xa] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
        out[0xb] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
        out[0xc] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
        out[0xd] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
        out[0xe] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
        out[0xf] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
    };
    const buffer1 = identity(new Float32Array(16));
    const buffer2 = identity(new Float32Array(16));
    const output = new Float32Array(16);

    return function test() {
        multiply(output, buffer1, buffer2);
    };
}

export function glMatrix_arrays() {
    const multiply = function (out, a, b) {
        let a00 = a[0x0], a01 = a[0x1], a02 = a[0x2], a03 = a[0x3];
        let a10 = a[0x4], a11 = a[0x5], a12 = a[0x6], a13 = a[0x7];
        let a20 = a[0x8], a21 = a[0x9], a22 = a[0xa], a23 = a[0xb];
        let a30 = a[0xc], a31 = a[0xd], a32 = a[0xe], a33 = a[0xf];

        // Cache only the current line of the second matrix
        let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return out;
    };
    const array1 = identity([]);
    const array2 = identity([]);
    const output = [];

    return function test() {
        multiply(output, array1, array2);
    };
}

export function glMatrix_buffers() {
    const multiply = function (out, a, b) {
        let a00 = a[0x0], a01 = a[0x1], a02 = a[0x2], a03 = a[0x3];
        let a10 = a[0x4], a11 = a[0x5], a12 = a[0x6], a13 = a[0x7];
        let a20 = a[0x8], a21 = a[0x9], a22 = a[0xa], a23 = a[0xb];
        let a30 = a[0xc], a31 = a[0xd], a32 = a[0xe], a33 = a[0xf];

        // Cache only the current line of the second matrix
        let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];

        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return out;
    };
    const buffer1 = identity(new Float32Array(16));
    const buffer2 = identity(new Float32Array(16));
    const output = new Float32Array(16);

    return function test() {
        multiply(output, buffer1, buffer2);
    };
}
