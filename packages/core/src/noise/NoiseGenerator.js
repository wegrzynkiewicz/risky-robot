import SimplexNoise from 'simplex-noise';

const TAU = 2 * Math.PI;

const simplex = new SimplexNoise(1);
const worldWidth = 16;
const worldHeight = 16;

const width = 16;
const height = 16;

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
                0.70 * torusnoise(nx, ny, 0.5)
                - 0.40 * torusnoise(nx, ny, 2)
                + 0.40 * torusnoise(nx, ny, 3)
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

generate();

const NoiseGenerator = buffer;

export default NoiseGenerator;
