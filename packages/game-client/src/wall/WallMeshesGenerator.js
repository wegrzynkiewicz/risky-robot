import calculateTriangleNormal from "../graphic/calculateTriangleNormal";
import WallFacesGenerator from "./WallFacesGenerator";
import WallVerticesGenerator from "./WallVerticesGenerator";
import * as glHelper from "../helpers/glHelper";

export default class WallMeshesGenerator {

    constructor({flat, bevel}) {
        this.flat = flat;
        this.bevel = bevel;
    }

    generateWallMeshes() {
        const verticesGenerator = new WallVerticesGenerator({
            bevel: this.bevel,
        });

        const verticesPosition = verticesGenerator.generateVerticesPosition();
        const verticesUVMapping = verticesGenerator.generateVertivesUVMapping();

        const meshes = [];
        for (let wallVariant of this.generateWallVariants()) {
            const triangles = [];
            for (let triangleInfo of wallVariant.triangles) {
                const normal = glHelper.vec3(0,0,0);
                const vertices = [];
                const positions = [];
                for (let index of triangleInfo.indices) {
                    // TODO: add vertex object
                    const position = verticesPosition[index];
                    const vertex = {
                        normal,
                        position,
                        textureCoords: verticesUVMapping[index][triangleInfo.direction],
                    };
                    vertices.push(vertex);
                    positions.push(position);
                }

                const calculatedNormal = calculateTriangleNormal(...positions);
                normal.set(calculatedNormal);

                // TODO: add triangle object
                const triangle = {
                    vertices,
                };
                triangles.push(triangle);
            }
            // TODO: add mesh object
            const mesh = {
                elements: triangles.length,
                triangles
            };
            meshes.push(mesh);
        }

        return meshes;
    }

    generateWallVariants() {

        const flat = flatPlane => this.flat ? flatPlane : [];

        const facesGenerator = new WallFacesGenerator({
            flat: this.flat,
            bevel: this.bevel,
        });
        const triangles = facesGenerator.generateTriangle();

        const wallVariants = [
            {
                bitMask: 0x0000,
                name: "alone",
                triangles: [
                    ...triangles["topCPlane"],
                    ...triangles["frontTrapeze"],
                    ...triangles["backTrapeze"],
                    ...triangles["leftTrapeze"],
                    ...triangles["rightTrapeze"],
                ],
            },
            {
                bitMask: 0x0001,
                name: "right",
                triangles: [
                    ...triangles["top6CPlane"],
                    ...triangles["frontRightFlatTrapeze"],
                    ...triangles["backRightFlatTrapeze"],
                    ...triangles["leftTrapeze"],
                    ...flat(triangles["rightFlat"]),
                ],
            },
            {
                bitMask: 0x0010,
                name: "left",
                triangles: [
                    ...triangles["top4CPlane"],
                    ...triangles["frontLeftFlatTrapeze"],
                    ...triangles["backLeftFlatTrapeze"],
                    ...triangles["rightTrapeze"],
                    ...flat(triangles["leftFlat"]),
                ],
            },
            {
                bitMask: 0x0011,
                name: "horizontal",
                triangles: [
                    ...triangles["horizontalTopWall"],
                    ...triangles["frontWall"],
                    ...triangles["backWall"],
                    ...flat(triangles["leftFlat"]),
                    ...flat(triangles["rightFlat"]),
                ],
            },
            {
                bitMask: 0x0100,
                name: "back",
                triangles: [
                    ...triangles["top8CPlane"],
                    ...triangles["frontTrapeze"],
                    ...triangles["leftBackFlatTrapeze"],
                    ...triangles["rightBackFlatTrapeze"],
                    ...flat(triangles["backFlat"]),
                ],
            },
            {
                bitMask: 0x0101,
                name: "back-right",
                triangles: [
                    ...triangles["top8CPlane"],
                    ...triangles["top6Plane"],
                    ...triangles["frontRightFlatTrapeze"],
                    ...triangles["leftBackFlatTrapeze"],
                    ...triangles["corner2"],
                    ...flat(triangles["backFlat"]),
                    ...flat(triangles["rightFlat"]),
                ],
            },
            {
                bitMask: 0x0110,
                name: "back-left",
                triangles: [
                    ...triangles["top8CPlane"],
                    ...triangles["top4Plane"],
                    ...triangles["frontLeftFlatTrapeze"],
                    ...triangles["rightBackFlatTrapeze"],
                    ...triangles["corner3"],
                    ...flat(triangles["backFlat"]),
                    ...flat(triangles["leftFlat"]),
                ],
            },
            {
                bitMask: 0x0111,
                name: "horizontal-back",
                triangles: [
                    ...triangles["horizontalTopWall"],
                    ...triangles["top8Plane"],
                    ...triangles["frontWall"],
                    ...triangles["corner2"],
                    ...triangles["corner3"],
                    ...flat(triangles["backFlat"]),
                    ...flat(triangles["leftFlat"]),
                    ...flat(triangles["rightFlat"]),
                ],
            },
            {
                bitMask: 0x1000,
                name: "front",
                triangles: [
                    ...triangles["top2CPlane"],
                    ...triangles["backTrapeze"],
                    ...triangles["leftFrontFlatTrapeze"],
                    ...triangles["rightFrontFlatTrapeze"],
                    ...flat(triangles["frontFlat"]),
                ],
            },
            {
                bitMask: 0x1001,
                name: "front-right",
                triangles: [
                    ...triangles["top2CPlane"],
                    ...triangles["top6Plane"],
                    ...triangles["leftFrontFlatTrapeze"],
                    ...triangles["backRightFlatTrapeze"],
                    ...triangles["corner1"],
                    ...flat(triangles["frontFlat"]),
                    ...flat(triangles["rightFlat"]),
                ],
            },
            {
                bitMask: 0x1010,
                name: "front-left",
                triangles: [
                    ...triangles["top2CPlane"],
                    ...triangles["top4Plane"],
                    ...triangles["rightFrontFlatTrapeze"],
                    ...triangles["backLeftFlatTrapeze"],
                    ...triangles["corner0"],
                    ...flat(triangles["frontFlat"]),
                    ...flat(triangles["leftFlat"]),
                ],
            },
            {
                bitMask: 0x1011,
                name: "horizontal-front",
                triangles: [
                    ...triangles["horizontalTopWall"],
                    ...triangles["top2Plane"],
                    ...triangles["backWall"],
                    ...triangles["corner0"],
                    ...triangles["corner1"],
                    ...flat(triangles["frontFlat"]),
                    ...flat(triangles["leftFlat"]),
                    ...flat(triangles["rightFlat"]),
                ],
            },
            {
                bitMask: 0x1100,
                name: "vertical",
                triangles: [
                    ...triangles["verticalTopWall"],
                    ...triangles["leftWall"],
                    ...triangles["rightWall"],
                    ...flat(triangles["frontFlat"]),
                    ...flat(triangles["backFlat"]),
                ],
            },
            {
                bitMask: 0x1101,
                name: "vertical-right",
                triangles: [
                    ...triangles["verticalTopWall"],
                    ...triangles["top6Plane"],
                    ...triangles["leftWall"],
                    ...triangles["corner1"],
                    ...triangles["corner2"],
                    ...flat(triangles["frontFlat"]),
                    ...flat(triangles["backFlat"]),
                    ...flat(triangles["rightFlat"]),
                ],
            },
            {
                bitMask: 0x1110,
                name: "vertical-left",
                triangles: [
                    ...triangles["verticalTopWall"],
                    ...triangles["top4Plane"],
                    ...triangles["rightWall"],
                    ...triangles["corner0"],
                    ...triangles["corner3"],
                    ...flat(triangles["frontFlat"]),
                    ...flat(triangles["backFlat"]),
                    ...flat(triangles["leftFlat"]),
                ],
            },
            {
                bitMask: 0x1111,
                name: "all",
                triangles: [
                    ...triangles["verticalTopWall"],
                    ...triangles["top4Plane"],
                    ...triangles["top6Plane"],
                    ...triangles["corner0"],
                    ...triangles["corner1"],
                    ...triangles["corner2"],
                    ...triangles["corner3"],
                    ...flat(triangles["frontFlat"]),
                    ...flat(triangles["backFlat"]),
                    ...flat(triangles["leftFlat"]),
                    ...flat(triangles["rightFlat"]),
                ],
            },
        ];

        return wallVariants;
    }
}
