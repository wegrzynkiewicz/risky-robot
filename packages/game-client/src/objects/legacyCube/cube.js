class FloatBufferBuilder {

    constructor(size) {
        this.offset = 0;
        this.vertices = [];
        this.buffer = new Float32Array(size);
    }

    vec3(x, y, z) {
        this.buffer[this.offset++] = x;
        this.buffer[this.offset++] = y;
        this.buffer[this.offset++] = z;
        return this;
    }

    add(plus) {
        const vertex = plus.split('').map(c => parseFloat(`${c}0.5`));
        this.vertices.push(vertex);
    }

    generate() {
        for (let i = 0; i < 6; i++) {
            for (let grow of [0, 1, 2, 0, 2, 3]) {
                this.vec3(...this.vertices[i * 4 + grow]);
                this.vec3(...this.vertices[i * 4 + grow]);
            }
        }
    }
}

export default {
    data() {

        const builder = new FloatBufferBuilder(6 * 6 * 6);

        // top
        builder.add('-++');
        builder.add('+++');
        builder.add('++-');
        builder.add('-+-');

        // bottom
        builder.add('---');
        builder.add('+--');
        builder.add('+-+');
        builder.add('--+');

        // front
        builder.add('--+');
        builder.add('+-+');
        builder.add('+++');
        builder.add('-++');

        // back
        builder.add('+--');
        builder.add('---');
        builder.add('-+-');
        builder.add('++-');

        // left
        builder.add('---');
        builder.add('--+');
        builder.add('-++');
        builder.add('-+-');

        // right
        builder.add('+-+');
        builder.add('+--');
        builder.add('++-');
        builder.add('+++');

        builder.generate();

        return builder.buffer;
    },
};
