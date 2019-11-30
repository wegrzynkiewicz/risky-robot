export default class WallFacesGenerator {

    constructor({flat}) {
        this.flat = flat;
    }

    generateTriangle() {
        const plane = (direction, [i0, i1, i2, i3]) => {
            return [
                {direction, indices: [i0, i1, i2]},
                {direction, indices: [i0, i2, i3]},
            ];
        };

        const triangles = {
            "frontTrapeze": plane("front", [0, 1, 9, 8]),
            "backTrapeze": plane("back", [2, 3, 11, 10]),
            "leftTrapeze": plane("left", [3, 0, 8, 11]),
            "rightTrapeze": plane("right", [1, 2, 10, 9]),

            "frontFlat": plane("front", [0, 1, 13, 12]),
            "backFlat": plane("back", [2, 3, 17, 16]),
            "leftFlat": plane("left", [3, 0, 19, 18]),
            "rightFlat": plane("right", [1, 2, 15, 14]),

            "frontLeftFlatTrapeze": plane("front", [0, 1, 9, 19]),
            "frontRightFlatTrapeze": plane("front", [0, 1, 14, 8]),
            "backLeftFlatTrapeze": plane("back", [2, 3, 18, 10]),
            "backRightFlatTrapeze": plane("back", [2, 3, 11, 15]),
            "leftFrontFlatTrapeze": plane("left", [3, 0, 12, 11]),
            "leftBackFlatTrapeze": plane("left", [3, 0, 8, 17]),
            "rightFrontFlatTrapeze": plane("right", [1, 2, 10, 13]),
            "rightBackFlatTrapeze": plane("right", [1, 2, 16, 9]),

            "frontWall": plane("front", [0, 1, 14, 19]),
            "backWall": plane("back", [2, 3, 18, 15]),
            "leftWall": plane("left", [3, 0, 12, 17]),
            "rightWall": plane("right", [1, 2, 16, 13]),

            "horizontalTopWall": plane("top", [19, 14, 15, 18]),
            "verticalTopWall": plane("top", [12, 13, 16, 17]),

            "topCPlane": plane("top", [8, 9, 10, 11]),
            "top8CPlane": plane("top", [8, 9, 16, 17]),
            "top2CPlane": plane("top", [12, 13, 10, 11]),
            "top4CPlane": plane("top", [18, 19, 9, 10]),
            "top6CPlane": plane("top", [14, 15, 11, 8]),
            "top8Plane": plane("top", [16, 17, 11, 10]),
            "top2Plane": plane("top", [12, 13, 9, 8]),
            "top4Plane": plane("top", [18, 19, 8, 11]),
            "top6Plane": plane("top", [14, 15, 10, 9]),

            "corner0": [
                {direction: "left", indices: [0, 12, 8]},
                {direction: "front", indices: [0, 8, 19]},
            ],
            "corner1": [
                {direction: "front", indices: [1, 14, 9]},
                {direction: "right", indices: [1, 9, 13]},
            ],
            "corner2": [
                {direction: "right", indices: [2, 16, 10]},
                {direction: "back", indices: [2, 10, 15]},
            ],
            "corner3": [
                {direction: "back", indices: [3, 18, 11]},
                {direction: "left", indices: [3, 11, 17]},
            ],
        };

        return triangles;
    }
}
