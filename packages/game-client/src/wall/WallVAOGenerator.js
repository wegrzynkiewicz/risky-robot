import wallTestingRegionData from "./wallTestingRegionData";
import VAOLayout from "../layout/VAOLayout";
import WallMeshesGenerator from "./WallMeshesGenerator";

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
const orientations = [
    {bit: 0b1000, dx: 0, dz: 1},
    {bit: 0b0100, dx: 0, dz: -1},
    {bit: 0b0010, dx: -1, dz: 0},
    {bit: 0b0001, dx: 1, dz: 0},
];

const vaoLayout = new VAOLayout({
    primitive: "triangle",
    buffers: [
        new VAOLayout.Buffer({
            name: "vertices",
            type: "array",
            schema: "abc",
            attributes: [
                new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexTextureCoords", type: "vec2<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>"}),
            ],
        }),
    ],
});

const vaoAllocation = vaoLayout.createVAOAllocation(8600);
const vaoBufferAllocation = vaoAllocation.getVAOBufferAllocationByName("vertices");
const dataView = vaoBufferAllocation.createArrayBufferByDataView();
const a_VertexPosition = vaoBufferAllocation.getAttributeAllocationByName("a_VertexPosition");
const a_VertexNormal = vaoBufferAllocation.getAttributeAllocationByName("a_VertexNormal");

const wallMeshesGenerator = new WallMeshesGenerator({bevel: 0.3, flat: true});
const meshes = wallMeshesGenerator.generateWallMeshes();

class WallVAOGenerator {

    constructor(meshes) {
        this.meshes = meshes;
        this.offset = 0;
        this.offsetN = 0;
        this.vertices = 0;
    }

    generate(chunk) {
        for (let y = chunk.depth - 1; y >= 0; y--) {
            for (let z = chunk.height - 1; z >= 0; z--) {
                for (let x = chunk.width - 1; x >= 0; x--) {
                    let bitMask = 0;
                    const element = chunkReader.getValue(chunk, x, y, z);
                    if (element === 0) {
                        continue;
                    }
                    for (let {bit, dx, dz} of orientations) {
                        const next = chunkReader.getValue(chunk, x + dx, y, z + dz);
                        if (next === 1) {
                            bitMask |= bit;
                        }
                    }

                    this.addMesh({x, y, z}, bitMask);
                }
            }
        }
    }

    addMesh({x, y, z}, bitMask) {
        const mesh = this.meshes[bitMask];
        for (let triangle of mesh.triangles) {
            for (let vertex of triangle.vertices) {
                const types = [
                    vertex.position[0] + x,
                    vertex.position[1] + y,
                    vertex.position[2] + z,
                ];
                a_VertexPosition.write(dataView, this.offset, types);
                a_VertexNormal.write(dataView, this.offset, vertex.normal);
                this.offset++;
                this.vertices++;
            }
        }
    }
}

const wallVAOGenerator = new WallVAOGenerator(meshes);
wallVAOGenerator.generate(wallTestingRegionData);

export default {vaoAllocation, wallVAOGenerator, dataView};
