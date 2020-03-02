/* eslint-disable */

const elements = 65536;
const index = 65532;

export function mapRead() {
    const map = new Map();
    for (let i = 0; i < elements; i++) {
        map.set(i, i * 2);
    }
    return function test() {
        return map.get(index);
    };
}

export function objectRead() {
    const object = {};
    for (let i = 0; i < elements; i++) {
        object[i] = i * 2;
    }
    return function test() {
        return object[index];
    };
}

export function objectNullRead() {
    const object = Object.create(null);
    for (let i = 0; i < elements; i++) {
        object[i] = i * 2;
    }
    return function test() {
        return object[index];
    };
}

export function arrayRead() {
    const array = [];
    for (let i = 0; i < elements; i++) {
        array[i] = i * 2;
    }
    return function test() {
        return array[index];
    };
}

export function typedArrayUInt8Read() {
    const typedArray = new Uint8Array(elements);
    for (let i = 0; i < elements; i++) {
        typedArray[i] = i * 2;
    }
    return function test() {
        return typedArray[index];
    };
}

export function typedArrayUInt32Read() {
    const typedArray = new Uint32Array(elements);
    for (let i = 0; i < elements; i++) {
        typedArray[i] = i * 2;
    }
    return function test() {
        return typedArray[index];
    };
}

export function typedArrayFloat32Read() {
    const typedArray = new Float32Array(elements);
    for (let i = 0; i < elements; i++) {
        typedArray[i] = i * 2;
    }
    return function test() {
        return typedArray[index];
    };
}

export function dataViewUInt8Read() {
    const arrayBuffer = new ArrayBuffer(elements);
    const dataView = new DataView(arrayBuffer);
    for (let i = 0; i < elements; i++) {
        dataView.setUint8(i, i * 2);
    }
    return function test() {
        return dataView.getUint8(index);
    };
}

export function dataViewUInt32Read() {
    const arrayBuffer = new ArrayBuffer(elements * 4);
    const dataView = new DataView(arrayBuffer);
    for (let i = 0; i < elements; i++) {
        dataView.setUint32(i * 4, i * 2);
    }
    return function test() {
        return dataView.getUint32(index * 4);
    };
}

export function dataViewFloat32Read() {
    const arrayBuffer = new ArrayBuffer(elements * 4);
    const dataView = new DataView(arrayBuffer);
    for (let i = 0; i < elements; i++) {
        dataView.setFloat32(i * 4, i * 2);
    }
    return function test() {
        return dataView.getFloat32(index * 4);
    };
}
