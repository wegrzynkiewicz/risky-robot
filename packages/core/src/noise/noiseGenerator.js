import SimplexNoise from "simplex-noise";

const TAU = 2 * Math.PI;

const simplex = new SimplexNoise(1);
const worldWidth = 512;
const worldHeight = 512;

const width = 256;
const height = 256;

let manipulator = 0;
let offsetY = 256;
let offsetX = 256;

const buffer = new Uint8Array(width * height);

const generate = function () {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            const nx = (x + offsetX) / worldWidth;
            const ny = (y + offsetY) / worldHeight;

            let r =
                0.90 * torusnoise(nx, ny, 0.5)
                //+ 0.25 * torusnoise(nx, ny, 4)
                //+ 0.25 * torusnoise(nx, ny, 5)
                //+ 0.25 * torusnoise(nx, ny, 6)
                // - 1 / 4 * torusnoise(nx, ny, 5)
                //+ 1 / 4 * torusnoise(1 * nx, 1 * ny, 0.01)
                //+ 1 / 11 * torusnoise(11 * nx, 11 * ny, 11)
                //- 1 / 13 * torusnoise(13 * nx, 13 * ny, 13)
            ;

            r /= (1.00);
            r = Math.pow(r, 1.40);

            buffer[(x + y * width)] = r * 255;
        }
    }
};

function cylindernoise(nx, ny) {
    const angle_x = TAU * nx;
    return simplex.noise3D(
        manipulator * Math.cos(angle_x) / TAU,
        manipulator * Math.sin(angle_x) / TAU,
        manipulator * ny
    );
}

function torusnoise(nx, ny, manip) {
    const angle_x = TAU * nx;
    const angle_y = TAU * ny;
    const noise = simplex.noise4D(
        (manipulator + manip) * Math.cos(angle_x) / TAU,
        (manipulator + manip) * Math.sin(angle_x) / TAU,
        (manipulator + manip) * Math.cos(angle_y) / TAU,
        (manipulator + manip) * Math.sin(angle_y) / TAU
    );
    return (noise + 1.0) / 2.0;
}

export default buffer;
