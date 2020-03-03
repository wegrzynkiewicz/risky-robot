import Core from 'robo24-core';
import VAOLayout from '../../layout/VAOLayout';

const noise = Core.NoiseGenerator;

const noiseChunkSize = 16;
const chunkSize = 16;
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
    let line = '';
    for (let x = 0; x < chunkSize; x++) {
        line += bufferWorld[2 * chunkSizeSquare + z * chunkSize + x] ? 'x' : '.'
    }
    console.log(`${z} ${line}`);
}

const orientCalc = [
    {label: 'top', orientIndex: 0, dx: 0, dy: 1, dz: 0},
    {label: 'bottom', orientIndex: 1, dx: 0, dy: -1, dz: 0},
    {label: 'front', orientIndex: 2, dx: 0, dy: 0, dz: 1},
    {label: 'back', orientIndex: 3, dx: 0, dy: 0, dz: -1},
    {label: 'left', orientIndex: 4, dx: -1, dy: 0, dz: 0},
    {label: 'right', orientIndex: 5, dx: 1, dy: 0, dz: 0},
];

class Test {

    constructor() {
        this.vertices = [];
        this.planes = [];
    }

    putTriangleVertices({label, index, orientIndex, dx, dy, dz}) {
        const globalOrientIndex = orientIndex * 6;

        for (let i = 0; i < 6; i++) {
            this.vertices.push({
                gl_VertexID: i,
                globalOrientIndex: globalOrientIndex + i,
                orientLabel: label,
                orientIndex: orientIndex,
                index,
                y: Math.floor(index / chunkSizeSquare),
                z: Math.floor(index % chunkSizeSquare / chunkSize),
                x: Math.floor(index % chunkSize),
            });
        }
    }

    putMesh({element, index, orientIndex, label, dx, dy, dz}) {
        this.putTriangleVertices({label, orientIndex, index, dx, dy, dz});
        this.planes.push({label, index, element, dx, dy, dz});
    }

    getElement(x, y, z) {
        const index = y * (chunkSizeSquare) + (z * chunkSize) + x;
        if (x > chunkSize) {
            return 0;
        }
        if (y > chunkSize) {
            return 0;
        }
        if (y <= 0) {
            return 1;
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
                    for (let {label, orientIndex, dx, dy, dz} of orientCalc) {
                        if (!this.getElement(x + dx, y + dy, z + dz)) {
                            this.putMesh({element, orientIndex, label, index, dx, dy, dz});
                        }
                    }
                }
            }
        }
    }
}

const test = new Test();
test.calculate();

console.log(test);

const bufferLayout = new VAOLayout.Buffer({
    type: 'array',
    schema: 'ab/c/d',
    attributes: [
        new VAOLayout.Attribute({name: 'a_Position', type: 'vec3<f32>'}),
        new VAOLayout.Attribute({name: 'a_Color', type: 'vec3<f32>'}),
        new VAOLayout.Attribute({name: 'a_VertexOrientation', type: 's32'}),
        new VAOLayout.Attribute({name: 'a_PositionIndex', type: 's32'}),
    ],
});

const vaoLayout = new VAOLayout({
    elements: test.vertices.length / 3,
    primitive: 'triangle',
    buffers: [
        bufferLayout,
    ],
});

const colors = {
    0: [0,255,0],
    1: [0,128,0],
    2: [0,0,255],
    3: [0,0,128],
    4: [255,0,0],
    5: [128,0,0],
};

const vaoAllocation = bufferLayout.createVAOAllocation(vaoLayout);
const dataView = vaoAllocation.createArrayBufferByDataView();
const a_Position = vaoAllocation.getAttributeAllocationByName('a_Position');
const a_VertexOrientation = vaoAllocation.getAttributeAllocationByName('a_VertexOrientation');
const a_PositionIndex = vaoAllocation.getAttributeAllocationByName('a_PositionIndex');
const a_Color = vaoAllocation.getAttributeAllocationByName('a_Color');

for (let v = 0; v < test.vertices.length; v++) {
    const pos = [test.vertices[v].x, test.vertices[v].y, test.vertices[v].z];
    a_Position.write(dataView, v, pos);
    a_VertexOrientation.write(dataView, v, test.vertices[v].orientIndex);
    a_Color.write(dataView, v, colors[test.vertices[v].orientIndex]);
    a_PositionIndex.write(dataView, v, test.vertices[v].index);
}


export default {vaoLayout, dataView};
