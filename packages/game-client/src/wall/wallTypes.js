const plane = (direction, [i0, i1, i2, i3]) => {
    return [
        {direction, indices: [i0, i1, i2]},
        {direction, indices: [i0, i2, i3]},
    ];
};

const flat = flatPlane => flatPlane;

const frontTrapeze = plane("front", [0, 1, 9, 8]);
const backTrapeze = plane("back", [2, 3, 11, 10]);
const leftTrapeze = plane("left", [3, 0, 8, 11]);
const rightTrapeze = plane("right", [1, 2, 10, 9]);

const frontFlat = plane("front", [0, 1, 13, 12]);
const backFlat = plane("back", [2, 3, 17, 16]);
const leftFlat = plane("left", [3, 0, 19, 18]);
const rightFlat = plane("right", [1, 2, 15, 14]);

const frontLeftFlatTrapeze = plane("front", [0, 1, 9, 19]);
const frontRightFlatTrapeze = plane("front", [0, 1, 14, 8]);
const backLeftFlatTrapeze = plane("back", [2, 3, 18, 10]);
const backRightFlatTrapeze = plane("back", [2, 3, 11, 15]);
const leftFrontFlatTrapeze = plane("left", [3, 0, 12, 11]);
const leftBackFlatTrapeze = plane("left", [3, 0, 8, 17]);
const rightFrontFlatTrapeze = plane("right", [1, 2, 10, 13]);
const rightBackFlatTrapeze = plane("right", [1, 2, 16, 9]);

const frontWall = plane("front", [0, 1, 14, 19]);
const backWall = plane("back", [2, 3, 18, 15]);
const leftWall = plane("left", [3, 0, 12, 17]);
const rightWall = plane("right", [1, 2, 16, 13]);

const horizontalTopWall = plane("top", [19, 14, 15, 18]);
const verticalTopWall = plane("top", [12, 13, 16, 17]);

const topCPlane = plane("top", [8, 9, 10, 11]);
const top8CPlane = plane("top", [8, 9, 16, 17]);
const top2CPlane = plane("top", [12, 13, 10, 11]);
const top4CPlane = plane("top", [18, 19, 9, 10]);
const top6CPlane = plane("top", [14, 15, 11, 8]);
const top8Plane = plane("top", [16, 17, 11, 10]);
const top2Plane = plane("top", [12, 13, 9, 8]);
const top4Plane = plane("top", [18, 19, 8, 11]);
const top6Plane = plane("top", [14, 15, 10, 9]);

const corner0 = [
    {direction: "left", indices:[0, 12, 8]},
    {direction: "front", indices:[0, 8, 19]},
];
const corner1 = [
    {direction: "front", indices:[1, 14, 9]},
    {direction: "right", indices:[1, 9, 13]},
];
const corner2 = [
    {direction: "right", indices:[2, 16, 10]},
    {direction: "back", indices:[2, 10, 15]},
];
const corner3 = [
    {direction: "back", indices:[3, 18, 11]},
    {direction: "left", indices:[3, 11, 17]},
];

export const wallVariants = [
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
