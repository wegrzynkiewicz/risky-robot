import wallTestingRegionData from "./wallTestingRegionData";
import WallVertices from "./WallVertices";
import {wallVariants} from "./wallTypes";
import VAOLayout from "../layout/VAOLayout";
import * as glMatrix from "gl-matrix";

const chunkReader = {
    getValue(chunk, x, y, z) {
        if (x > chunk.width) {
            return 0;
        }
        if (y > chunk.depth) {
            return 0;
        }
        if (z > chunk.height) {
            return 0;
        }

        return chunk.getElementByAxis(x, y, z);
    }
};

const calculateNormal = function (a, b, c) {
    const s1 = glMatrix.vec3.create();
    const s2 = glMatrix.vec3.create();
    const s3 = glMatrix.vec3.create();
    const s4 = glMatrix.vec3.create();
    glMatrix.vec3.sub(s1, b, a);
    glMatrix.vec3.sub(s2, c, a);
    glMatrix.vec3.cross(s3, s2, s1);
    glMatrix.vec3.normalize(s4, s3);

    return s4;
};

const orientations = [
    {label: "front", bitShift: 0b1000, dx: 0, dz: 1},
    {label: "back", bitShift: 0b0100, dx: 0, dz: -1},
    {label: "left", bitShift: 0b0010, dx: -1, dz: 0},
    {label: "right", bitShift: 0b0001, dx: 1, dz: 0},
];

const wallVertices = new WallVertices({
    bevel: 0.2,
    step: 0.5,
    yOffset: 0
});

const vertices = wallVertices.generate();

const objects = wallVariants.map(variant => {
    const data = [];
    for (let triangle of variant.triangles) {
        const triangleData = [];
        for (let index of triangle.indices) {
            triangleData.push(vertices[index].pos);
        }
        data.push(triangleData);
    }
    return data;
});

console.log(objects);

const bufferLayout = new VAOLayout.Buffer({
    type: "array",
    schema: "ab",
    attributes: [
        new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
        new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>"}),
    ],
});

const vaoLayout = new VAOLayout({
    elements: 8200,
    primitive: "triangle",
    buffers: [
        bufferLayout,
    ]
});

const vaoAllocation = bufferLayout.createVAOAllocation(vaoLayout);
const dataView = vaoAllocation.createArrayBufferByDataView();
const a_VertexPosition = vaoAllocation.getAttributeAllocationByName("a_VertexPosition");
const a_VertexNormal = vaoAllocation.getAttributeAllocationByName("a_VertexNormal");

class WallVAOGenerator {

    constructor() {
        this.offset = 0;
        this.offsetN = 0;
        this.vertices = 0;
    }

    generate(chunk, objects) {

        const mesh = [];

        for (let y = chunk.depth - 1; y >= 0; y--) {
            for (let z = chunk.height - 1; z >= 0; z--) {
                for (let x = chunk.width - 1; x >= 0; x--) {
                    let bitMask = 0;
                    const element = chunkReader.getValue(chunk, x, y, z);
                    if (element === 0) {
                        continue;
                    }
                    for (let {label, bitShift, dx, dz} of orientations) {
                        const next = chunkReader.getValue(chunk, x + dx, y, z + dz);
                        if (next === 1) {
                            bitMask |= bitShift;
                        }
                    }

                    this.addMesh({x, y, z}, bitMask);
                }
            }
        }
    }

    addMesh({x, y, z}, bitMask) {
        const object = objects[bitMask];
        for (let triangle of object) {
            const normal = calculateNormal(...triangle);
            for (let vertex of triangle) {
                const types = [
                    vertex[0] + x,
                    vertex[1] + y,
                    vertex[2] + z,
                ];
                a_VertexPosition.write(dataView, this.offset++, types);
                this.vertices++;
            }
            a_VertexNormal.write(dataView, this.offsetN++, normal);
            a_VertexNormal.write(dataView, this.offsetN++, normal);
            a_VertexNormal.write(dataView, this.offsetN++, normal);
        }
    }
}

const wallVAOGenerator = new WallVAOGenerator();
wallVAOGenerator.generate(wallTestingRegionData);

export default {vaoLayout, wallVAOGenerator, dataView};
