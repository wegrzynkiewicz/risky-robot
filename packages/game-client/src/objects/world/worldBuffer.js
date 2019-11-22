import Core from "robo24-core";
import VAOLayout from "../../layout/VAOLayout";
import cubeVAOLayout from "../cube/cubeVAOLayout";

const noise = Core.NoiseGenerator;

const noiseChunkSize = 256;
const chunkSize = 256;
const chunkSizeLess = chunkSize - 1;
const chunkSizeSquare = chunkSize ** 2;

const bufferWorld = new Uint8Array(chunkSize ** 3);

for (let z = 0; z < chunkSize; z++) {
    for (let x = 0; x < chunkSize; x++) {
        const value = noise[z * noiseChunkSize + x];
        const elementNumber = Math.round(value / 255 * chunkSize);
        for (let y = 0; y < elementNumber; y++) {
            bufferWorld[y * chunkSizeSquare + z * chunkSize + x] = 1;
        }
    }
}

for (let z = 0; z < chunkSize; z++) {
    let line = "";
    for (let x = 0; x < chunkSize; x++) {
        line += bufferWorld[2 * chunkSizeSquare + z * chunkSize + x] ? "x" : "."
    }
    console.log(line);
}

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

    putTriangleVertices({orient, index}) {
        const orientIndex = orient.index * 6;
        for (let i = 0; i < 6; i++) {
            this.vertices.push({
                gl_VertexID: i,
                orientIndex: orientIndex + i,
                orientLabel: orient.label,
                index,
                y: Math.floor(index / chunkSizeSquare),
                z: Math.floor(index % chunkSizeSquare / chunkSize),
                x: Math.floor(index % chunkSize),
            });
        }
    }

    putMesh({element, index, orient, height}) {
        this.putTriangleVertices({orient, index});
        this.planes.push({orient, index, element});
    }

    getElement(x, y, z) {
        const index = y * (chunkSizeSquare) + (z * chunkSize) + x;
        if (x > chunkSize) {
            return 0;
        }
        if (y > chunkSize) {
            return 0;
        }
        if (z > chunkSize) {
            return 0;
        }
        return bufferWorld[index];
    }

    calculate() {

        const mesh = [];

        for (let y = chunkSizeLess; y >= 0; y--) {
            for (let z = chunkSizeLess; z >= 0; z--) {
                for (let x = chunkSizeLess; x >= 0; x--) {
                    const index = y * (chunkSizeSquare) + (z * chunkSize) + x;
                    const element = bufferWorld[index];
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

console.log(test);

const bufferLayout = new VAOLayout.Buffer({
    type: "array",
    schema: "a",
    attributes: [
        new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
    ],
});

const vaoLayout = new VAOLayout({
    elements: test.vertices.length / 3,
    primitive: "triangle",
    buffers: [
        bufferLayout,
    ]
});

const vaoAllocation = bufferLayout.createVAOAllocation(vaoLayout);
const dataView = vaoAllocation.createArrayBufferByDataView();
const positionAllocation = vaoAllocation.getAttributeAllocationByName("a_VertexPosition");

for (let v = 0; v < test.vertices.length; v++) {
    const pos = [test.vertices[v].x, test.vertices[v].y, test.vertices[v].z];
    positionAllocation.write(dataView, v, pos);
}

export default {vaoLayout, dataView};
