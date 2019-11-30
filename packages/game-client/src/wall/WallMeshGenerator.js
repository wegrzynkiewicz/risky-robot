import WallVerticesGenerator from "./WallVerticesGenerator";
import calculateTriangleNormal from "../graphic/calculateTriangleNormal";

export default class WallMeshGenerator {

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
            for (let triangle of wallVariant. triangles) {
                const vertices = [];
                for (let index of triangle.indices) {
                    // TODO: add vertex object
                    const vertex = {
                        position: verticesPosition[index],
                        textureCoords: verticesUVMapping[index][triangle.direction],
                    };
                    vertices.push(vertex);
                }
                // TODO: add triangle object
                const triangle = {
                    vertices,
                    normal: calculateTriangleNormal(...vertices),
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

        const wallVariants = [
            {
                bitMask: 0x0000,
                name: "alone",
                triangles: [
                    ...topCPlane,
                    ...frontTrapeze,
                    ...backTrapeze,
                    ...leftTrapeze,
                    ...rightTrapeze,
                ],
            },
            {
                bitMask: 0x0001,
                name: "right",
                triangles: [
                    ...top6CPlane,
                    ...frontRightFlatTrapeze,
                    ...backRightFlatTrapeze,
                    ...leftTrapeze,
                    ...flat(rightFlat),
                ],
            },
            {
                bitMask: 0x0010,
                name: "left",
                triangles: [
                    ...top4CPlane,
                    ...frontLeftFlatTrapeze,
                    ...backLeftFlatTrapeze,
                    ...rightTrapeze,
                    ...flat(leftFlat),
                ],
            },
            {
                bitMask: 0x0011,
                name: "horizontal",
                triangles: [
                    ...horizontalTopWall,
                    ...frontWall,
                    ...backWall,
                    ...flat(leftFlat),
                    ...flat(rightFlat),
                ],
            },
            {
                bitMask: 0x0100,
                name: "back",
                triangles: [
                    ...top8CPlane,
                    ...frontTrapeze,
                    ...leftBackFlatTrapeze,
                    ...rightBackFlatTrapeze,
                    ...flat(backFlat),
                ],
            },
            {
                bitMask: 0x0101,
                name: "back-right",
                triangles: [
                    ...top8CPlane,
                    ...top6Plane,
                    ...frontRightFlatTrapeze,
                    ...leftBackFlatTrapeze,
                    ...corner2,
                    ...flat(backFlat),
                    ...flat(rightFlat),
                ],
            },
            {
                bitMask: 0x0110,
                name: "back-left",
                triangles: [
                    ...top8CPlane,
                    ...top4Plane,
                    ...frontLeftFlatTrapeze,
                    ...rightBackFlatTrapeze,
                    ...corner3,
                    ...flat(backFlat),
                    ...flat(leftFlat),
                ],
            },
            {
                bitMask: 0x0111,
                name: "horizontal-back",
                triangles: [
                    ...horizontalTopWall,
                    ...top8Plane,
                    ...frontWall,
                    ...corner2,
                    ...corner3,
                    ...flat(backFlat),
                    ...flat(leftFlat),
                    ...flat(rightFlat),
                ],
            },
            {
                bitMask: 0x1000,
                name: "front",
                triangles: [
                    ...top2CPlane,
                    ...backTrapeze,
                    ...leftFrontFlatTrapeze,
                    ...rightFrontFlatTrapeze,
                    ...flat(frontFlat),
                ],
            },
            {
                bitMask: 0x1001,
                name: "front-right",
                triangles: [
                    ...top2CPlane,
                    ...top6Plane,
                    ...leftFrontFlatTrapeze,
                    ...backRightFlatTrapeze,
                    ...corner1,
                    ...flat(frontFlat),
                    ...flat(rightFlat),
                ],
            },
            {
                bitMask: 0x1010,
                name: "front-left",
                triangles: [
                    ...top2CPlane,
                    ...top4Plane,
                    ...rightFrontFlatTrapeze,
                    ...backLeftFlatTrapeze,
                    ...corner0,
                    ...flat(frontFlat),
                    ...flat(leftFlat),
                ],
            },
            {
                bitMask: 0x1011,
                name: "horizontal-front",
                triangles: [
                    ...horizontalTopWall,
                    ...top2Plane,
                    ...backWall,
                    ...corner0,
                    ...corner1,
                    ...flat(frontFlat),
                    ...flat(leftFlat),
                    ...flat(rightFlat),
                ],
            },
            {
                bitMask: 0x1100,
                name: "vertical",
                triangles: [
                    ...verticalTopWall,
                    ...leftWall,
                    ...rightWall,
                    ...flat(frontFlat),
                    ...flat(backFlat),
                ],
            },
            {
                bitMask: 0x1101,
                name: "vertical-right",
                triangles: [
                    ...verticalTopWall,
                    ...top6Plane,
                    ...leftWall,
                    ...corner1,
                    ...corner2,
                    ...flat(frontFlat),
                    ...flat(backFlat),
                    ...flat(rightFlat),
                ],
            },
            {
                bitMask: 0x1110,
                name: "vertical-left",
                triangles: [
                    ...verticalTopWall,
                    ...top4Plane,
                    ...rightWall,
                    ...corner0,
                    ...corner3,
                    ...flat(frontFlat),
                    ...flat(backFlat),
                    ...flat(leftFlat),
                ],
            },
            {
                bitMask: 0x1111,
                name: "all",
                triangles: [
                    ...verticalTopWall,
                    ...top4Plane,
                    ...top6Plane,
                    ...corner0,
                    ...corner1,
                    ...corner2,
                    ...corner3,
                    ...flat(frontFlat),
                    ...flat(backFlat),
                    ...flat(leftFlat),
                    ...flat(rightFlat),
                ],
            },
        ];

        return wallVariants;
    }
}
