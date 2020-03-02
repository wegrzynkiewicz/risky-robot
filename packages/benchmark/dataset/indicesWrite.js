/* eslint-disable */

const elements = 2 ** 16;

export function mapWrite() {
    const map = new Map();
    return function test() {
        for (let i = 0; i < elements; i++) {
            map.set(i, i * 2);
        }
        return map;
    };
}

export function objectWrite() {
    const object = {};
    return function test() {
        for (let i = 0; i < elements; i++) {
            object[i] = i * 2;
        }
        return object;
    };
}

export function objectNullWrite() {
    const object = Object.create(null);
    return function test() {
        for (let i = 0; i < elements; i++) {
            object[i] = i * 2;
        }
        return object;
    };
}

export function arrayWrite() {
    const array = [];
    return function test() {
        for (let i = 0; i < elements; i++) {
            array[i] = i * 2;
        }
        return array;
    };
}

export function typedArrayUInt8Write() {
    const typedArray = new Uint8Array(elements);
    return function test() {
        for (let i = 0; i < elements; i++) {
            typedArray[i] = i * 2;
        }
        return typedArray;
    };
}

export function typedArrayUInt32Write() {
    const typedArray = new Uint32Array(elements);
    return function test() {
        for (let i = 0; i < elements; i++) {
            typedArray[i] = i * 2;
        }
        return typedArray;
    };
}

export function typedArrayFloat32Write() {
    const typedArray = new Float32Array(elements);
    return function test() {
        for (let i = 0; i < elements; i++) {
            typedArray[i] = i * 2;
        }
        return typedArray;
    };
}

export function dataViewUInt8Write() {
    const arrayBuffer = new ArrayBuffer(elements);
    const dataView = new DataView(arrayBuffer);
    return function test() {
        for (let i = 0; i < elements; i++) {
            dataView.setUint8(i, i * 2);
        }
        return dataView;
    };
}

export function dataViewUInt32Write() {
    const arrayBuffer = new ArrayBuffer(elements * 4);
    const dataView = new DataView(arrayBuffer);
    return function test() {
        for (let i = 0; i < elements; i++) {
            dataView.setUint32(i * 4, i * 2);
        }
        return dataView;
    };
}

export function dataViewFloat32Write() {
    const arrayBuffer = new ArrayBuffer(elements * 4);
    const dataView = new DataView(arrayBuffer);
    return function test() {
        for (let i = 0; i < elements; i++) {
            dataView.setFloat32(i * 4, i * 2);
        }
        return dataView;
    };
}
