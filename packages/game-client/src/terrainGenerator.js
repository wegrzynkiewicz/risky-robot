const buffer = new Uint8Array(32 * 32 * 32);
let counter = 0;

buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;

buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;

buffer[counter++] = 1;
buffer[counter++] = 0;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 0;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 2;
buffer[counter++] = 1;
buffer[counter++] = 1;


buffer[counter++] = 0;
buffer[counter++] = 0;
buffer[counter++] = 2;
buffer[counter++] = 0;
buffer[counter++] = 1;
buffer[counter++] = 0;
buffer[counter++] = 0;
buffer[counter++] = 0;
buffer[counter++] = 0;
buffer[counter++] = 1;
buffer[counter++] = 0;
buffer[counter++] = 0;
buffer[counter++] = 0;
buffer[counter++] = 1;
buffer[counter++] = 1;
buffer[counter++] = 2;

const chunkSize = 32;
const chunkSizeLess = 31;

const orientCalc = [
    {orient: {label: "top", index: 0}, dx: 0, dy: 1, dz: 0},
    {orient: {label: "bottom", index: 1}, dx: 0, dy: -1, dz: 0},
    {orient: {label: "front", index: 2}, dx: 0, dy: 0, dz: 1},
    {orient: {label: "back", index: 3}, dx: 0, dy: 0, dz: -1},
    {orient: {label: "left", index: 4}, dx: -1, dy: 0, dz: 0},
    {orient: {label: "right", index: 5}, dx: 1, dy: 0, dz: 0},
];

class Test {

    constructor() {
        this.vertices = [];
        this.planes = [];
    }

    putVertex({orientIndex, height}) {
        this.vertices.push({orientIndex, height});
    }

    putTriangleVertices({orient}) {
        const orientIndex = orient.index * 6;
        for (let i = 0; i < 6; i++) {
            this.putVertex({orientIndex: orientIndex + i, height: 255});
        }
    }

    putMesh({element, index, orient, height}) {
        this.putTriangleVertices({orient, height: 1.0});
        this.planes.push({orient, index, element});
    }

    getElement(x, y, z) {
        const index = y * (chunkSize ** 2) + (z * chunkSize) + x;
        if (x > chunkSize) {
            return 0;
        }
        if (y > chunkSize) {
            return 0;
        }
        if (z > chunkSize) {
            return 0;
        }
        return buffer[index];
    }

    calculate() {

        const mesh = [];

        for (let y = chunkSizeLess; y >= 0; y--) {
            for (let z = chunkSizeLess; z >= 0; z--) {
                for (let x = chunkSizeLess; x >= 0; x--) {
                    const index = y * (chunkSize ** 2) + (z * chunkSize) + x;
                    const element = buffer[index];
                    if (element === 0) {
                        continue;
                    }
                    for (let {orient, dx, dy, dz, height} of orientCalc) {
                        if (!this.getElement(x + dx, y + dy, z + dz)) {
                            this.putMesh({element, index, orient, height});
                        }
                    }
                }
            }
        }
    }

    makeBuffers() {
        const vertices = new Uint8Array(this.vertices.length * 2);
        let index = 0;
        for (let vertex of this.vertices) {
            vertices[index++] = vertex.orientIndex;
            vertices[index++] = vertex.height;
        }

        const planes = new Uint16Array(this.vertices.length * 2);
        let indexPlanes = 0;
        for (let plane of this.planes) {
            planes[indexPlanes++] = plane.index;
            planes[indexPlanes++] = plane.element;
        }

        return {
            vertices,
            planes
        }
    }
}

const test = new Test();
test.calculate();
const buffers = test.makeBuffers();

export default buffers;
