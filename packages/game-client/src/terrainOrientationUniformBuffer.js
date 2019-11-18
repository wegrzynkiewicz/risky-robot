const verticesPerPlane = 4;

const textureCoordinates = [
    [0.0, 1.0],
    [1.0, 1.0],
    [1.0, 0.0],
    [0.0, 0.0],
];

class FloatBufferBuilder {

    constructor(size) {
        this.offset = 0;
        this.vertices = [];
        this.buffer = new Float32Array(size);
    }

    vec(...args) {
        for (let arg of args) {
            this.buffer[this.offset++] = arg;
        }
    }

    add(plus) {
        const vertex = plus.split("").map(c => parseFloat(`${c}0.5`));
        this.vertices.push(vertex);
    }

    generate() {
        this.generateForIndices([0, 1, 2, 0, 2, 3]);
        this.generateForIndices([3, 0, 1, 3, 1, 2]);
    }

    generateForIndices(indices) {
        for (let planeIndex = 0; planeIndex < 6; planeIndex++) {
            for (let index of indices) {
                const [x, y, z] = this.vertices[planeIndex * verticesPerPlane + index];
                this.vec(x, z);
                this.vec(...textureCoordinates[index]);
            }
        }
    }
}

function calculate () {

    const builder = new FloatBufferBuilder(6 * 6 * 4);

    // top
    builder.add("-++");
    builder.add("+++");
    builder.add("++-");
    builder.add("-+-");

    // bottom
    builder.add("---");
    builder.add("+--");
    builder.add("+-+");
    builder.add("--+");

    // front
    builder.add("--+");
    builder.add("+-+");
    builder.add("+++");
    builder.add("-++");

    // back
    builder.add("+--");
    builder.add("---");
    builder.add("-+-");
    builder.add("++-");

    // left
    builder.add("---");
    builder.add("--+");
    builder.add("-++");
    builder.add("-+-");

    // right
    builder.add("+-+");
    builder.add("+--");
    builder.add("++-");
    builder.add("+++");

    builder.generate();

    return builder.buffer;
}

const terrainOrientationUniformBuffer = calculate();

export default terrainOrientationUniformBuffer;
