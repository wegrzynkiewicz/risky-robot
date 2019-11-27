/**
 *   Top:
 *
 *   7-----17----16----6
 *   |     |     |     |
 *   |     |     |     |
 *   18----11----10----15
 *   |     |     |     |
 *   |     |     |     |
 *   19----8-----9-----14
 *   |     |     |     |
 *   |     |     |     |
 *   4-----12----13----5
 *
 *   Bottom:
 *
 *   3-----------------2
 *   |                 |
 *   |                 |
 *   |                 |
 *   |                 |
 *   |                 |
 *   |                 |
 *   |                 |
 *   |                 |
 *   0-----------------1
 *
 */

const plane = (direction, [i0, i1, i2, i3]) => {
    return [
        {direction, indices: [i0, i1, i2]},
        {direction, indices: [i0, i2, i3]},
    ];
};

const frontTrapeze = plane("front", [0, 1, 9, 8]);
const backTrapeze = plane("back", [2, 3, 11, 10]);
const leftTrapeze = plane("left", [3, 0, 8, 11]);
const rightTrapeze = plane("right", [1, 2, 10, 9]);

export default [
    {
        bitMask: 0x0000,
        name: "center",
        triangles: [
            ...plane("top", [8, 9, 10, 11]),
            ...frontTrapeze,
            ...backTrapeze,
            ...leftTrapeze,
            ...rightTrapeze,
        ],
    },
    {
        bitMask: 0x1000,
        name: "top",
        triangles: [
            ...plane("top", [8, 9, 16, 17]),
            ...frontTrapeze,
            ...plane("back", [2, 3, 7, 6]),
            ...plane("left", [3, 0, 19, 7]),
            ...plane("right", [1, 2, 16, 9]),
        ],
    },
    {
        bitMask: 0x0010,
        name: "back",
        triangles: [
            ...plane("top", [12, 13, 10, 11]),
            ...plane("front", [0, 1, 5, 3]),
            ...backTrapeze,
            ...plane("left", [3, 0, 19, 7]),
            ...plane("right", [1, 2, 16, 9]),
        ],
    },
    {
        bitMask: 0x0001,
        name: "left",
        triangles: [
            ...plane("top", [18, 19, 9, 10]),
            ...plane("front", [0, 1, 9, 19]),
            ...plane("back", [2, 3, 18, 10]),
            ...plane("left", [3, 0, 4, 7]),
            ...rightTrapeze,
        ],
    },
    {
        bitMask: 0x0100,
        name: "right",
        triangles: [
            ...plane("top", [14, 15, 11, 8]),
            ...plane("front", [0, 1, 14, 8]),
            ...plane("back", [2, 3, 11, 15]),
            ...leftTrapeze,
            ...plane("right", [1, 2, 6, 7]),
        ],
    },
]
